import math
from typing import List, Literal
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/seo/geo-grid", tags=["Módulo 5: Monitor Local 3-Pack"])

EARTH_RADIUS_KM = 6371.0


class GeoGridRequest(BaseModel):
    center_lat: float = Field(..., ge=-90, le=90)
    center_lng: float = Field(..., ge=-180, le=180)
    grid_size: Literal[3, 5, 7] = Field(default=5, description="Dimensão NxN da matriz (3x3, 5x5 ou 7x7)")
    step_distance_km: float = Field(default=1.5, gt=0.1, le=20.0, description="Distância em km entre cada ponto")
    keyword: str = Field(..., min_length=3, examples=["advogado trabalhista"])


class GridCoordinateNode(BaseModel):
    row: int
    col: int
    latitude: float
    longitude: float
    is_center: bool
    uule_param: str  # Parâmetro de localização codificado para simulação de SERP


def generate_coordinate_matrix(
    center_lat: float, center_lng: float, size: int, step_km: float
) -> List[GridCoordinateNode]:
    half = size // 2
    nodes: List[GridCoordinateNode] = []

    # 1 grau de latitude ~= 111.32 km
    lat_step_deg = step_km / 111.32
    # 1 grau de longitude varia conforme o cosseno da latitude
    lng_step_deg = step_km / (111.32 * math.cos(math.radians(center_lat)))

    for r_idx, row_offset in enumerate(range(half, -half - 1, -1)):
        for c_idx, col_offset in enumerate(range(-half, half + 1)):
            node_lat = round(center_lat + (row_offset * lat_step_deg), 6)
            node_lng = round(center_lng + (col_offset * lng_step_deg), 6)
            nodes.append(
                GridCoordinateNode(
                    row=r_idx,
                    col=c_idx,
                    latitude=node_lat,
                    longitude=node_lng,
                    is_center=(row_offset == 0 and col_offset == 0),
                    uule_param=f"lat:{node_lat},lng:{node_lng},radius:500m",
                )
            )
    return nodes


@router.post("/build-matrix", response_model=List[GridCoordinateNode])
async def build_local_pack_matrix(payload: GeoGridRequest):
    """Gera a malha de coordenadas para enfileirar jobs de verificação do Local 3-Pack no Celery/QStash."""
    return generate_coordinate_matrix(
        center_lat=payload.center_lat,
        center_lng=payload.center_lng,
        size=payload.grid_size,
        step_km=payload.step_distance_km,
    )
