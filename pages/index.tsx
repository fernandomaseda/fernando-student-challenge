import React, { useState, useEffect, useCallback, memo } from "react";
import { StudentInfo, ListStudentOrders, CartObject } from "../libs/types";
import fetcher from "../api/service";
import Head from "next/head";
import Custom500 from "./500";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/header";
import PriceGrid from "../components/priceGrid";
import NestedCheckList from "../components/nestedCheckList";

const Home = () => {
  const [dataList, setDataList] = useState<ListStudentOrders | null>(null);
  const [dataInfo, setDataInfo] = useState<StudentInfo | null>(null);
  const [error, setError] = useState<boolean>(false);

  const [cart, setCart] = useState<Array<CartObject>>([]);

  const fetchList = () => {
    fetcher.list().then((res) => {
      if (res.action === 1) {
        let data: ListStudentOrders | null = res.data;
        return setDataList(data);
      }
      if (res.action === 2) {
        return setError(true);
      }
    });
  };

  const fetchInfo = () => {
    fetcher.info().then((res) => {
      if (res.action === 1) {
        let data: StudentInfo | null = res.data;
        return setDataInfo(data);
      }
      if (res.action === 2) {
        return setError(true);
      }
    });
  };

  useEffect(() => {
    fetchList();
    fetchInfo();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx ~ line 85 ~ Home ~ cart", cart);
  }, [cart]);

  if (error) {
    return <Custom500 />;
  }

  if (!dataList || !dataInfo) {
    return (
      <div
        style={{
          display: "grid",
          height: "70vh",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress style={{ width: "70px", height: "70px" }} />
      </div>
    );
  }

  const allList = [
    {
      status: "PAID",
      primary: "Cuotas Pagadas",
      secondary: "Haga click para expandir",
    },
    {
      status: "DUE",
      primary: "Cuotas Pendientes",
      secondary: "Haga click para expandir",
    },
    {
      status: "OUTSTANDING",
      primary: "Cuotas Futuras",
      secondary: "Haga click para expandir",
    },
  ];

  const setCartPrice = (id: string, price: number) => {
    if (!cart.some((v) => v.id === id)) {
      setCart((prevState) => {
        return [...prevState, { id: id, price: price }];
      });
    } else {
      setCart((prevState) => {
        let temp = [...prevState];
        temp.splice(
          prevState.findIndex((v) => v.id === id),
          1
        );
        return temp;
      });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Student Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <PriceGrid info={dataInfo} cart={cart} />

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {allList.map((elem, i) => (
          <NestedCheckList
            info={dataInfo}
            list={dataList}
            type={elem}
            key={i}
            handleToggle={setCartPrice}
            cart={cart}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
