from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable


@dataclass
class KPIResult:
    """Aggregated KPI metrics returned by background jobs."""

    impressions: int
    clicks: int
    conversions: int
    spend: float

    @property
    def ctr(self) -> float:
        return round(self.clicks / self.impressions, 4) if self.impressions else 0.0

    @property
    def cpa(self) -> float:
        return round(self.spend / self.conversions, 2) if self.conversions else 0.0


def merge_kpi_results(results: Iterable[KPIResult]) -> KPIResult:
    impressions = sum(result.impressions for result in results)
    clicks = sum(result.clicks for result in results)
    conversions = sum(result.conversions for result in results)
    spend = sum(result.spend for result in results)
    return KPIResult(
        impressions=impressions,
        clicks=clicks,
        conversions=conversions,
        spend=spend,
    )
