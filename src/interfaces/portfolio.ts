interface PortfolioPrice {
  ITEM_CD_DL: string;
  UDT_DT: Date;
  ADJ_CLOSE_USD: number;
  ADJ_CLOSE_KRW: number;
}


interface PortfolioData {
  name: string;
  ticker: string;
  quantity: number;
  total: number;
  krName: string;
  price: number;
  krPrice: number;
  krTotal: number;
}

interface InterestedAssets {
  name: string;
  ticker: string;
  krName: string;
}
interface UserPortfolio {
  name: string;
  krName: string;
  ticker: string;
  quantity: number;
  price: number;
  krPrice: number;
}

interface Portfolio {
  name: string;
  krName: string;
  ticker: string;
  quantity: number;
  price: number;
  krPrice: number;
}

interface UserInfo {
  id?: string;
  email?: string;
  platform_type?: string;
  name?: string;
  profileImage?: string;
  created_at?: number;
  accessLevel?: number;
  membership?: number;
  preferredBank?: string;
  interestedAssets?: InterestedAssets[];
  interestedResult?: string;
  portfolio?: Portfolio[]
  portfolioResult?: number;
  portfolioLevel?: string;
  portfolioTime?: string;

}

interface SelectAsset {
  name: string;
  ticker: string;
  krName: string;
  quantity: number;


}

interface SearchList {
  ADJ_CLOSE_KRW: number;
  UDT_DT: Date;
  LOC: string;
  HR_ITEM_NM: string;
  ITEM_KR_NM: string;
  LV_DSCP_KR: string;
  LV_DSCP_ENG: string;
  ITEM_CD_DL: string;
  ITEM_ENG_NM: string;
  CVaR_LV: string;
  WTHR_ENG_NM: string;
  WTHR_ENG_DL: string;
  CVaRNTS: number;
  EXP_CVaRNTS: number;
  ADJ_CLOSE: number;
  ADJ_CLOSE_USD: number;
  WTHR_KR_DL: string;
  CVaR_LV_KR: number;
  TRADE_VALUE: number;
}


export type { InterestedAssets, PortfolioPrice, UserInfo, PortfolioData, SearchList, SelectAsset, UserPortfolio }