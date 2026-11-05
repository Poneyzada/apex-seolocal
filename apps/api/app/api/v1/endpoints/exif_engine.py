import io
import re
import unicodedata
from typing import Tuple, List
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from PIL import Image
import piexif
from starlette.concurrency import run_in_threadpool

router = APIRouter(prefix="/seo/media", tags=["Módulo 1: GBP & Local SEO Media Engine"])

Rational = Tuple[int, int]
DMSRational = Tuple[Rational, Rational, Rational]


class ExifGeoMetadata(BaseModel):
    company_name: str = Field(..., min_length=2, max_length=100, examples=["Clínica Odontológica Sorriso Real"])
    service_category: str = Field(..., min_length=2, max_length=80, examples=["Implante Dentário"])
    neighborhood: str = Field(..., min_length=2, max_length=80, examples=["Barra da Tijuca"])
    city: str = Field(..., min_length=2, max_length=80, examples=["Rio de Janeiro"])
    latitude: float = Field(..., ge=-90.0, le=90.0, examples=[-23.000371])
    longitude: float = Field(..., ge=-180.0, le=180.0, examples=[-43.365894])
    keywords: List[str] = Field(default_factory=list, examples=[["dentista barra", "implante protocolo"]])


def slugify_seo(value: str) -> str:
    """Converte strings para slug ASCII limpo: nome-empresa-servico-bairro-cidade."""
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    cleaned = re.sub(r"[^a-zA-Z0-9\s-]", "", normalized).strip().lower()
    return re.sub(r"[-\s]+", "-", cleaned)


def decimal_to_dms_rational(decimal_coord: float) -> DMSRational:
    """
    Converte coordenada decimal (ex: -23.000371) para o formato racional EXIF DMS:
    ((graus, 1), (minutos, 1), (segundos * 10000, 10000))
    """
    abs_coord = abs(decimal_coord)
    degrees = int(abs_coord)
    minutes_float = (abs_coord - degrees) * 60
    minutes = int(minutes_float)
    seconds = round((minutes_float - minutes) * 60 * 10000)

    dms_tuple: DMSRational = (
        (degrees, 1),
        (minutes, 1),
        (seconds, 10000),
    )
    return dms_tuple


def build_exif_bytes(meta: ExifGeoMetadata) -> bytes:
    """Constrói a árvore binária EXIF compatível com WebP e Google Business Profile."""
    lat_dms = decimal_to_dms_rational(meta.latitude)
    lng_dms = decimal_to_dms_rational(meta.longitude)

    lat_ref = b"N" if meta.latitude >= 0 else b"S"
    lng_ref = b"E" if meta.longitude >= 0 else b"W"

    gps_ifd = {
        piexif.GPSIFD.GPSVersionID: (2, 3, 0, 0),
        piexif.GPSIFD.GPSLatitudeRef: lat_ref,
        piexif.GPSIFD.GPSLatitude: lat_dms,
        piexif.GPSIFD.GPSLongitudeRef: lng_ref,
        piexif.GPSIFD.GPSLongitude: lng_dms,
        piexif.GPSIFD.GPSMapDatum: b"WGS-84",
    }

    description = f"{meta.company_name} - {meta.service_category} em {meta.neighborhood}, {meta.city}"
    kw_string = "; ".join([meta.service_category, meta.neighborhood, meta.city, *meta.keywords])

    zeroth_ifd = {
        piexif.ImageIFD.Software: b"Apex Local & SEO Suite v1.0",
        piexif.ImageIFD.Artist: meta.company_name.encode("utf-8"),
        piexif.ImageIFD.ImageDescription: description.encode("utf-8"),
        # Tags Windows XP (UTF-16LE) lidas por indexadores de imagem
        piexif.ImageIFD.XPTitle: description.encode("utf-16le"),
        piexif.ImageIFD.XPKeywords: kw_string.encode("utf-16le"),
        piexif.ImageIFD.XPSubject: f"{meta.service_category} - {meta.city}".encode("utf-16le"),
    }

    exif_dict = {"0th": zeroth_ifd, "Exif": {}, "GPS": gps_ifd, "1st": {}, "thumbnail": None}
    return piexif.dump(exif_dict)


def _process_image_sync(raw_bytes: bytes, meta: ExifGeoMetadata, quality: int = 84) -> Tuple[io.BytesIO, str]:
    """Executa conversão WebP e injeção EXIF em threadpool para não bloquear o event loop."""
    with Image.open(io.BytesIO(raw_bytes)) as img:
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Redimensionamento preventivo para evitar LCP alto ou rejeição na API GBP (máx 1920px)
        max_dim = 1920
        if max(img.size) > max_dim:
            img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

        exif_bytes = build_exif_bytes(meta)
        output_buffer = io.BytesIO()
        img.save(output_buffer, format="WEBP", quality=quality, method=6, exif=exif_bytes)
        output_buffer.seek(0)

    filename = (
        f"{slugify_seo(meta.company_name)}-"
        f"{slugify_seo(meta.service_category)}-"
        f"{slugify_seo(meta.neighborhood)}-"
        f"{slugify_seo(meta.city)}.webp"
    )
    return output_buffer, filename


@router.post(
    "/optimize-and-geotag",
    summary="Converte imagem para WebP, injeta EXIF GPS (DMS) e aplica nomenclatura SEO Local",
    response_description="Arquivo binário .webp otimizado com cabeçalhos EXIF injetados",
)
async def optimize_and_geotag_image(
    file: UploadFile = File(...),
    company_name: str = Form(...),
    service_category: str = Form(...),
    neighborhood: str = Form(...),
    city: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    keywords_csv: str = Form(""),
):
    if file.content_type not in ("image/jpeg", "image/png", "image/webp"):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Formato inválido. Envie JPEG, PNG ou WebP.",
        )

    raw_bytes = await file.read()
    meta = ExifGeoMetadata(
        company_name=company_name,
        service_category=service_category,
        neighborhood=neighborhood,
        city=city,
        latitude=latitude,
        longitude=longitude,
        keywords=[k.strip() for k in keywords_csv.split(",") if k.strip()],
    )

    buffer, seo_filename = await run_in_threadpool(_process_image_sync, raw_bytes, meta)

    return StreamingResponse(
        buffer,
        media_type="image/webp",
        headers={
            "Content-Disposition": f'attachment; filename="{seo_filename}"',
            "X-Apex-SEO-Filename": seo_filename,
            "X-Apex-GPS-DMS-Injected": "true",
        },
    )
