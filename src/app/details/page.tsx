"use client";
import { Container, Text, TextBoxDisplay } from "@/components";
import Header from "@/components/layout/header";
import { Review } from "@/types/order";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
interface Details {
  id: string;
  name: string;
  averageRating: number;
  reviews: Review[];
}

const Details = () => {
  const [details, setDetails] = useState<Details>();
  const router = useSearchParams();
  useEffect(() => {
    const id = router.toString().split("=")[1];
    handleFetchMovieDetails(id);
  }, []);
  console.log(details, "details");
  const handleFetchMovieDetails = async (id: string) => {
    try {
      const res = await axios.get(`/api/review?mid=${id}`);
      setDetails(res.data.data);
    } catch (e) {
      console.log(e, "e");
    }
  };
  return (
    <>
      <Header />
      <main className="p-[2rem]">
        <div className="flex justify-between items-center">
          <Text style="text-[40px]">{details?.name || ""}</Text>
          <Text style="text-[40px] text-[#6558F5]">
            <>{details?.averageRating}/10</>
          </Text>
        </div>
        <Container vertical={true}>
          <>
            {details?.reviews.map((rev, i) => (
              <TextBoxDisplay
                reviewerName={rev.reviewerName}
                rating={rev.rating}
                description={rev.description}
                key={i}
              />
            ))}
          </>
        </Container>
      </main>
    </>
  );
};

export default Details;
