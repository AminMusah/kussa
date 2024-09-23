import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Founder() {
  return (
    <div className="pt-40 pb-10">
      <div className="px-2 md:px-20">
        {" "}
        <h1 className="font-bold text-[#384853] text-4xl">Founder</h1>
        <p className="text-sm text-[#384853]">Kussa shea bliss</p>
      </div>

      <div className="border border-[#e3e6ea] my-6 w-full" />
      <div className="px-2 md:px-20">
        <p>
          Irene Atubiga is a passionate entrepreneur with a strong drive for
          innovation and business growth. With over 10 years of experience in
          the banking sector, she developed expertise in customer relations,
          business strategy, and leadership. During her time in the banking
          sector, Irene's entrepreneurial spirit flourished, leading her to
          explore her roots and establish Kussa Shea Bliss—a company dedicated
          to producing high-quality, natural shea butter products.
        </p>

        <div className="w-full h-screen md:w-96 md:h-96  relative overflow-hidden rounded-xl float-left mt-5 mr-10 mb-10">
          <Image
            fill
            src={"/images/1000002516.jpg"}
            alt={"Founder"}
            sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>

        <p className="pt-6">
          Born and raised in Northern Ghana, Irene comes from a family with deep
          ties to shea butter production. The company believes in women
          empowerment and wealth creation, our shea butter is therefore sourced
          solely from old women who are into shea butter production. Her access
          to locally sourced, raw shea butter, combined with her desire to
          formalize this generational knowledge, inspired her to launch Kussa
          Shea Bliss. The company reflects her commitment to excellence and
          sustainability, steadily growing since its founding 5 years ago. Irene
          personally oversees the sourcing of all materials, both locally and
          internationally, ensuring that Kussa Shea Bliss offers only the finest
          products.
        </p>
        <p className="pt-6">
          In addition to her practical business experience, Irene holds a
          marketing certificate from Cornell University, and a bachelor’s degree
          in marketing from Central University, Ghana. further equipping her
          with the tools to build and grow her brand. She is also the founder of
          Luxie Trenz Boutique, a fashion boutique that has been thriving for
          over 8 years.
        </p>
        <p className="pt-6">
          Irene’s journey is fueled by her love for entrepreneurship and her
          dedication to creating brands that make a meaningful impact on both
          local and international markets.
        </p>
      </div>
    </div>
  );
}
