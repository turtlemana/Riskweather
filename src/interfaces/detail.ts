interface DetailData {
  HR_ITEM_NM: string;
  CAT: string;
  ITEM_KR_NM: string;
  LV_DSCP_KR: string;
  LV_DSCP_ENG: string;
  ITEM_ENG_NM: string;
  ADJ_CLOSE_CHG: number;
  ADJ_CLOSE_USD: number;
  VaRGauss: number;
  RW_IDX_95: number;
  VaRGauss_95: number;
  CVaRNTS_95: number;
  EXP_VaRNTS: number;
  EXP_CVaRNTS: number;
  EXP_VaRNTS_95: number;
  EXP_CVaRNTS_95: number;
  RW_IDX: number;
  ITEM_CD_DL: string;
  CVaR_LV_KR: string;
  CVaR_LV: string;
  ADJ_CLOSE: number;
  CVaRNTS: number;
  CURR: string;
  WTHR_ENG_NM: string;
  WTHR_ENG_DL: string;
  WTHR_KR_DL: string;
  UDT_DT: string;
}

interface DetailInfo {
  ITEM_CD?: string | number;
  ITEM_CD_DL?: string;
  ITEM_ENG_NM?: string;
  CAT?: string;
  COUNTRY?: string;
  WEBSITE?: string;
  SECTOR?: string;
  INDUSTRY?: string;
  LONG_BUSINESS_SUMMARY?: string;
  TOTAL_REVENUE?: number;
  GROSS_PROFITS?: number;
  NET_INCOME_TO_COMMON?: number;
  ETITDA?: number;
  REVENUE_GRWOTH?: number;
  EARNING_GRWOTH?: number;
  CURRENT_RATIO?: number;
  DEBT_TO_EQUITY?: number;
  FORWARD_EPS?: number;
  TRAILING_EPS?: number;
  BOOK_VALUE?: number;
  PRICE_TO_BOOK?: number;
  ROE?: number;
  BETA?: number;
  TOTAL_DEBT?: number;
  RETAINED_EARNINGS?: number;
  CASH?: number;
  INVENTORY?: number;
  DIVIDENED_YIELD?: number;
  ENTERPRISE_VALUE?: number;
  EPS?: number;
  PER?: number;
  ROA?: number;
  QUICK_RATIO?: number;
  description?: string;
  tags?: string;
  whitepaper?: string;
  MaxSupply?: number;
  TotalSupply?: number;
  Platform?: string;
}

interface InfoData {
  key: string;
  value: string | number | null;
}

interface RenderInfoData {
  id: number;
  originalData: string;
  title: string;
  koreanTitle: string;
  value?: string
}

interface CorrData {
  NP: number;
  RANK_NUM: number;
  HR_ITEM_NM: string;
  LV_DSCP_KR: string;
  LV_DSCP_ENG: string;
  ITEM_CD_DL: string;
  ITEM_ENG_NM: string;
  ITEM_KR_NM: string;
  CVaRNTS: number;
  EXP_VaRNTS: number;
  EXP_CVaRNTS: number;
  CVaR_LV: string;
  CVaR_LV_KR: string;
  WTHR_KR_NM: string;
  WTHR_ENG_NM: string;
  WTHR_KR_DL: string;
  WTHR_ENG_DL: string;
}

interface DetailChartInterface {
  date: string;
  cvar: number;
  rwi: number;
  ewi: number;
  price: number;

}

interface Forcast {
  DATE_PlUS: number | string;
  WTHR_ENG_NM: string;
  WTHR_ENG_DL: string;
  WTHR_KR_DL: string;
}






export type { DetailData, DetailInfo, InfoData, RenderInfoData, CorrData, DetailChartInterface, Forcast }