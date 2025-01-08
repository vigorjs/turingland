import { CardProperty } from "@/Components/CardProperty";
import SearchBar from "@/Components/search/SearchBar";
import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

export default function SearchPage() {
    const img3 =
        "https://s3-alpha-sig.figma.com/img/db80/4347/cb68839c79ca58a9b46777e9c9c07cc0?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nXWoIhqAUTi-at1criMJPC8l-xudGFynTTWb9Y-EQ3SJVxbjtvcOe0gMCLVH-t9DqTyNiL-Yzev8ZoIv8rUhxICHbXB8rkLeNKxj7EQ62uTTgu9cxyvbWTE~QRaByjGG1cJ6vcaSQ6MXKBL0oqfIGiBf0VqSA6UKFh5uufI7P4FLQmWmiBmecXFnhZ2A5p2FkQ5Vc~d9jsWCoMVMpC711S6lfNymccRCkodcG15Mx22s-p2ydCVU06b5TyCZg7x1tG2lcqPcdyaX07KFBNHfmAp9N23KdaCvnBgsmBAeg76eEDgO9y7B4xcEcerX559xGjDraUB~HpMhDXtZGXxetg__";

    const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

    return (
        <GuestLayout>
            <div className="px-3 md:px-6 lg:px-[150px] my-12">
                <SearchBar />
                <h2 className="text-2xl font-bold mb-2">
                    Menampilkan hasil pencarian “Pakubuwono Residence”
                </h2>
                <p className="text-gray-500 mb-4">
                    Menampilkan {arr.length} hasil
                </p>
                {/* CARD */}
                <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
                    {arr.length > 0
                        ? arr.map((_, index) => (
                              <CardProperty img={img3} key={index} isFullWhenMobile={true}>
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
                                      <p className="text-xs">LT: 40&sup2;</p>
                                      <p className="text-xs">LB: 40&sup2;</p>
                                  </div>
                                  <hr className="my-1" />
                                  <p className="text-xs font-semibold">
                                      Rp 200 juta
                                  </p>
                              </CardProperty>
                          ))
                        : null}
                </div>
            </div>
        </GuestLayout>
    );
}
