import { CardProperty } from "@/Components/CardProperty";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Components/ui/carousel";
import GuestLayout from "@/Layouts/GuestLayout";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function Home() {
    const img =
        "https://s3-alpha-sig.figma.com/img/4d88/1782/68287db3c9acf2df8297106e247ba38f?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qcFcvdpIG1WyBk5oeKtTbndJLW7FoL54nz~aptr1CZJzGBkJGEMT~QFoqvB3tF9tZTt-6iTM0vSETORe3za7aO9ypgtk8q3qMZ23hjvZhUfh~~rSCUxq64hm~sp6TYAyfcmg7dAk2JMZ3DDhhDLCGsFMd9B5nfBabifmKS65wIRcQOsHLsdqK9NqL5kEpCcRjNDi3eCfPLvdHYrm20uIzpxUkbHF4~KrMAyMvnP9u4BeMxuub7X6PI898nHkmbhg7rLO6BdMnbmWpBd~6xJLP1k04iUR6dN~0Y0lhxhW8bTT1AHf7Gt7LMhvPLOE65RiV46PQUZjN9sm~Mqd1LwBvg__";

    const img2 =
        "https://s3-alpha-sig.figma.com/img/b74a/c4c3/77ce5aaed022bc3392bf4c60e9f023f3?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TBddhCyuhgK3h9pPOzC6liBCEHm6TsYR7d~rH3sp4CvaC3yOelv4WVMmuxaxESdJNZc35GZAhsml9j6SGRGXsQOzrv92arIuKxGqA3G9aCE~3t24rREsBu3QdUvtkynVgfEqfZR30kwwC9guwj~syJ88f0fRfDbVJeZiyOTOqER4xiIV3wrAfMlcjQm9o-IcPSUM86bMEta04tgrQPaa2YxuMw~3EUz4FJJ~~gR2nASUu1cearMaxPV4coLrdbo2ysRfCKUs2HIDPgjEZQAf1xVt7tewP0fmtjjR7GxJ5FjWY5uzm3a-l3hcQaOIa~qekSB6fqROwfuzmK0r66Mt7Q__";

    const img3 =
        "https://s3-alpha-sig.figma.com/img/db80/4347/cb68839c79ca58a9b46777e9c9c07cc0?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nXWoIhqAUTi-at1criMJPC8l-xudGFynTTWb9Y-EQ3SJVxbjtvcOe0gMCLVH-t9DqTyNiL-Yzev8ZoIv8rUhxICHbXB8rkLeNKxj7EQ62uTTgu9cxyvbWTE~QRaByjGG1cJ6vcaSQ6MXKBL0oqfIGiBf0VqSA6UKFh5uufI7P4FLQmWmiBmecXFnhZ2A5p2FkQ5Vc~d9jsWCoMVMpC711S6lfNymccRCkodcG15Mx22s-p2ydCVU06b5TyCZg7x1tG2lcqPcdyaX07KFBNHfmAp9N23KdaCvnBgsmBAeg76eEDgO9y7B4xcEcerX559xGjDraUB~HpMhDXtZGXxetg__";

    const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

    return (
        <GuestLayout>
            <div className="px-3 md:px-6 lg:px-[150px]">
                {/* HERO SECTION */}
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 6000,
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {arr.length > 0
                            ? arr.map((_, index) => (
                                  <CarouselItem key={index}>
                                      <div
                                          className="relative w-full min-h-[580px] h-auto rounded-2xl bg-cover bg-center bg-fixed border border-gray-400"
                                          style={{
                                              backgroundImage: `url(${img})`,
                                          }}
                                      >
                                          {/* <div className="w-full min-h-full rounded-2xl bg-black/30 absolute top-0"/> */}
                                      </div>
                                  </CarouselItem>
                              ))
                            : null}
                    </CarouselContent>
                    {/* FILTRE */}
                    <div
                        className="absolute h-32 w-full overflow-x-auto -mt-36 z-50 px-4"
                        style={{ zIndex: 99999999 }}
                    >
                        <div className="shadow-xl bg-white w-full h-full rounded-2xl"></div>
                    </div>
                </Carousel>

                {/* ADS SECTION */}
                <Carousel
                    className="mt-24 mb-4"
                    plugins={[
                        Autoplay({
                            delay: 4500,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {arr.length > 0
                            ? arr.map((_, index) => (
                                  <CarouselItem
                                      key={`ads-section-${index}`}
                                      className="md:basis-1/1 lg:basis-1/2"
                                  >
                                      <div
                                          className="relative rounded-2xl h-[279px] bg-center bg-cover"
                                          style={{
                                              backgroundImage: `url(${img2})`,
                                          }}
                                      >
                                          {/* <div className="w-full h-full bg-black/30 absolute top-0 rounded-2xl flex justify-center items-center">
                                              <div className="w-4/5 mx-auto">
                                                  <h2 className="text-white text-4xl sm:text-5xl font-bold mb-3">
                                                      Fauzan Properties
                                                  </h2>
                                                  <p className="text-white text-base sm:text-xl">
                                                      Lorem ipsum dolor sit amet
                                                      consectetur, adipisicing
                                                      elit. Asperiores animi,
                                                      laboriosam aspernatur est
                                                      modi hic nulla
                                                      reprehenderit et
                                                  </p>
                                              </div>
                                          </div> */}
                                      </div>
                                  </CarouselItem>
                              ))
                            : null}
                    </CarouselContent>
                </Carousel>

                {/* RECCOMENDATION PROPERTIES */}
                <div className="mt-16 mb-4">
                    <div className="mb-3">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            Rekomendasi Properti Terpopuler
                        </h2>
                        <p className="text-base">
                            Cek rekomendasi properti terpopuler kami
                        </p>
                    </div>

                    {/* CARD */}
                    <div
                        className="flex overflow-x-scroll space-x-3 sm:space-x-5 snap-mandatory [&::-webkit-scrollbar]:h-0"
                        // [&::-webkit-scrollbar]:w-1
                        // [&::-webkit-scrollbar-track]:bg-gray-100
                        // [&::-webkit-scrollbar-thumb]:bg-[#FD9458]
                        // [&::-webkit-scrollbar-thumb]:rounded-full
                    >
                        {arr.length > 0
                            ? arr.map((_, index) => (
                                  <div className="flex-shrink-0" key={index}>
                                      <CardProperty
                                          img={img3}
                                          key={`properties-card-${index}`}
                                      >
                                          <h2 className="text-base font-bold">
                                              Fauzan Properties
                                          </h2>
                                          <div className="flex justify-start items-center gap-2">
                                              <p className="text-xs text-neutral-600">
                                                  I
                                              </p>
                                              <p className="text-xs text-neutral-600">
                                                  Jl. Kebon Jeruk, Jakarta
                                              </p>
                                          </div>

                                          <div className="flex justify-start items-center gap-3.5 mt-1">
                                              <p className="text-xs">
                                                  LT: 40&sup2;
                                              </p>
                                              <p className="text-xs">
                                                  LB: 40&sup2;
                                              </p>
                                          </div>
                                          <hr className="my-1" />
                                          <p className="text-xs font-semibold">
                                              Rp 200 juta
                                          </p>
                                      </CardProperty>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
