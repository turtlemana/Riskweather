interface CarouselData {
  HR_ITEM_NM: string;
  ITEM_ENG_NM: string;
  ITEM_KR_NM: string;
  ITEM_CD_DL: string;
  CVaR_LV_KR: string;
  CVaR_LV: string;
  CVaRNTS: number;
  EXP_CVaRNTS: number;
  ADJ_CLOSE: number;
  CURR: string;
  WTHR_ENG_NM: string;
  WTHR_KR_DL: string;
  WTHR_ENG_DL: string;
}

interface RiskLevelData {
  HR_ITEM_NM: string;
  ITEM_ENG_NM: string;
  ITEM_KR_NM: string;
  ITEM_CD_DL: string;
  CVaR_LV: string;
  CVaRNTS: number;
  EXP_CVaRNTS: number;
  WTHR_ENG_NM: string;
  CVaR_LV_KR: string;
  WTHR_KR_DL: string;
  WTHR_ENG_DL: string;
}

export type { CarouselData, RiskLevelData }