"use client";

import { Card, Container, Search, Text } from "@/components";
import CartItems, { CheckoutCart, product, products } from "@/components/cart";
import { Item } from "@/types/order";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [productsList, setProductsList] = useState<Item[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<Item[]>([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const router = useRouter();
  console.log(selectedProducts, "sdsd");
  const handleFetchItems = (s?: string) => {
    const reqURL = `/api/item${s ? `?s=${s}` : ""}`;
    try {
      axios.get(reqURL).then((res) => {
        console.log(res.data, "res");
        setProductsList(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (product: Item) => {
    try {
      const reqURL = `/api/orders?uid=${1}`;
      const res = await axios.post(reqURL, {
        ...product,
        quantity: 1,
        itemId: product.id,
        clientId: 1,
      });
      console.log(res.data, "res");
      // setSelectedProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemovefromCart = async (id: number) => {
    try {
      const reqURL = `/api/orders?id=${id}`;
      const res = await axios.delete(reqURL);
      console.log(res.data, "res");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchItems();
  }, []);
  return (
    <>
      {/* <Header callBack={() => handleFetchMovie()} /> */}
      <main className="p-[2rem]">
        <Search
          onChange={(e) => handleFetchItems(e.target.value)}
          label={<Text style="text-[40px]">Search Items</Text>}
        />

        <Container>
          <>
            <CartItems
              listHeading="Catalogue"
              products={productsList}
              onAddClick={(product: Item) => {
                addToCart(product);
                setSelectedProducts((prod) => {
                  const temp: Item[] = [...prod];
                  const existingProductIndex = temp.findIndex(
                    (val) => val.id === product.id
                  );
                  if (existingProductIndex !== -1) {
                    temp[existingProductIndex] = {
                      ...temp[existingProductIndex],
                      quantity: temp[existingProductIndex].quantity + 1,
                    };
                  } else {
                    temp.push({ ...product, quantity: 1 });
                  }
                  return temp;
                });
                setOpenSideBar(true);
              }}
            />
          </>
        </Container>
        <CheckoutCart
          open={openSideBar}
          setOpen={() => setOpenSideBar(!openSideBar)}
          products={selectedProducts}
          onRemoveClick={(id) => {
            handleRemovefromCart(id);
            setSelectedProducts((prod) => prod.filter((p) => p.id !== id));
          }}
        />
      </main>
    </>
  );
}
