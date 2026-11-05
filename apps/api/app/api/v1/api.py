from fastapi import APIRouter
from app.api.v1.endpoints import exif_engine, geo_grid, gtm_provision, cwv_auditor

api_router = APIRouter()

api_router.include_router(exif_engine.router)
api_router.include_router(geo_grid.router)
api_router.include_router(gtm_provision.router)
api_router.include_router(cwv_auditor.router)
