import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import kakao from "assets/icons/portfolio/kakao.svg";
import Header from "components/templates/portfolio/Header";
import Profile from "components/templates/portfolio/modal/Profile";
import Delete from "components/templates/portfolio/modal/Delete";
import Chart from "components/templates/portfolio/Chart";
import Add from "components/templates/portfolio/modal/Add";
import Assets from "components/templates/portfolio/Assets";
import AddAssets from "components/templates/portfolio/modal/AddAssets";
import EditAssets from "components/templates/portfolio/modal/EditAssets";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { PortfolioPrice, UserInfo } from "interfaces/portfolio";
import { Session } from "interfaces/login";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Portfolio = ({ session }: { session: Session }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { t } = useTranslation("portfolio");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currencySelect, setCurrencySelect] = useState(
    router.locale == "ko" ? 1 : 0
  );

  const {
    data: userInfo,
    isValidating,
    mutate,
  } = useSWR(`/api/auth/user?session=${session.user.email}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
  const { data: ptfPrice } = useSWR(
    userInfo?.user?.portfolio
      ? `/api/portfolioPrice?portfolio=${JSON.stringify(
          userInfo?.user?.portfolio
        )}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
  const { data, isValidating: searchValid } = useSWR(
    `/api/portfolioSearch?&search=${search}&page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const userProfile: UserInfo = userInfo ? [].concat(userInfo.user)[0] : {};
  const portfolioPrice: PortfolioPrice[] = ptfPrice ? [].concat(ptfPrice) : [];
  // const searchList=data?[].concat(...data) : [];
  const searchList = data ? [].concat(...data[0].assets) : [];
  const rowCount = data ? data[1].rowCount : 0;

  const ptfData = useMemo(() => {
    let result = [];
    if (userProfile?.portfolio) {
      for (let i = 0; i < userProfile.portfolio.length; i++) {
        for (let j = 0; j < portfolioPrice?.length; j++) {
          if (
            userProfile.portfolio[i].ticker === portfolioPrice[j].ITEM_CD_DL
          ) {
            result[i] = {
              ...userProfile.portfolio[i],
              date: portfolioPrice[j].UDT_DT,
              price: portfolioPrice[j].ADJ_CLOSE_USD,
              krPrice: portfolioPrice[j].ADJ_CLOSE_KRW,
              total:
                portfolioPrice[j].ADJ_CLOSE_USD *
                userProfile.portfolio[i].quantity,
              krTotal:
                portfolioPrice[j].ADJ_CLOSE_KRW *
                userProfile.portfolio[i].quantity,
            };
            break;
          }
        }
      }
    }
    return result;
  }, [userProfile, portfolioPrice]);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e?.target?.value;
    if (query?.length > 20) {
      return;
    }
    setSearch(query);
  }, []);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setSearch("");
    });
  }, [router.events]);

  const deleteHandler = async () => {
    const data = await fetch(`/api/auth/user?session=${session.user.email}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        signOut({ callbackUrl: `/${router.locale}/login` });
      } else {
        toast(
          router.locale == "ko"
            ? "네트워크 에러가 발생했습니다"
            : "Fetch Error",
          { hideProgressBar: true, autoClose: 2000, type: "error" }
        );
      }
    });
  };

  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenAddAssetsModal, setIsOpenAddAssetsModal] = useState(false);
  const [isOpenEditAssetsModal, setIsOpenEditAssetsModal] = useState(false);
  return (
    <main className=" py-10 pb-[96px]">
      <Header
        setIsOpenProfileModal={setIsOpenProfileModal}
        userProfile={userProfile}
      />

      <section className="flex gap-5 max-w-1320 min-w-[1024px]  mb-7 mx-auto">
        <Chart
          currencySelect={currencySelect}
          setCurrencySelect={setCurrencySelect}
          session={session}
          setIsOpenAddModal={setIsOpenAddModal}
          ptfData={ptfData}
          userProfile={userProfile}
          mutate={mutate}
        />
        <Assets
          currencySelect={currencySelect}
          setIsOpenAddModal={setIsOpenAddAssetsModal}
          setIsOpenEditAssetsModal={setIsOpenEditAssetsModal}
          userProfile={userProfile}
          ptfData={ptfData}
          isValidating={isValidating}
          mutate={mutate}
        />
      </section>
      <section className="flex max-w-1320 min-w-[1024px] mx-auto bg-white rounded-20 py-6 px-8 items-center">
        <h1 className="text-2xl text-gray-900 flex-1">
          {t("portfolioCustomerService")}
        </h1>
        <button
          onClick={() => {
            window.open("https://open.kakao.com/o/sU32v7ff", "_blank");
          }}
          className="flex gap-3 bg-[#FFCA42] rounded-[60px] py-[14px] w-[327px] justify-center"
        >
          <Image src={kakao} alt="" />
          <p className="text-sm font-medium">{t("kakaoTalk")}</p>
        </button>
      </section>

      {isOpenProfileModal && (
        <Profile
          session={session}
          setIsOpenProfileModal={setIsOpenProfileModal}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          userProfile={userProfile}
          isValidating={isValidating}
          mutate={mutate}
        />
      )}
      {isOpenDeleteModal && (
        <Delete
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
      {isOpenAddModal && (
        <Add
          setIsOpenAddModal={setIsOpenAddModal}
          userProfile={userProfile}
          isValidating={isValidating}
          mutate={mutate}
        />
      )}
      {isOpenAddAssetsModal && (
        <AddAssets
          setIsOpenAddModal={setIsOpenAddAssetsModal}
          session={session}
          userProfile={userProfile}
          isValidating={isValidating}
          currencySelect={currencySelect}
          mutate={mutate}
          search={search}
          setSearch={setSearch}
          onSearch={onSearch}
          searchList={searchList}
          searchValid={searchValid}
          rowCount={rowCount}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
      {isOpenEditAssetsModal && (
        <EditAssets
          session={session}
          setIsOpenAddModal={setIsOpenEditAssetsModal}
          userProfile={userProfile}
          isValidating={isValidating}
          mutate={mutate}
        />
      )}
    </main>
  );
};

export default Portfolio;
