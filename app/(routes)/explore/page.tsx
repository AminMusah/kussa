export default function Explore() {
  const features = [
    { name: "Origin", description: "Designed by Good Goods, Inc." },
    {
      name: "Material",
      description:
        "Solid walnut base with rare earth magnets and powder coated steel card cover",
    },
    { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
    {
      name: "Finish",
      description: "Hand sanded and finished with natural oil",
    },
    { name: "Includes", description: "Wood card tray and 3 refill packs" },
    {
      name: "Considerations",
      description:
        "Made from natural materials. Grain and color vary with each item.",
    },
  ];
  return (
    <div>
      <div className="pt-32 flex justify-center items-center flex-col gap-y-6">
        <div className="relative ">
          <p className="font-thin md:text-5xl text-center mb-4">
            KUSSA SHEA BLISS PRODUCTS
          </p>
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2  w-1/2 h-[2px] bg-black transition-all duration-300 ease-in-out"></span>
        </div>
        <p className="text-xs md:text-xl font-thin text-center max-w-xl py-16">
          TYPES OF PRODUCT AND USES/BENEFITS
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LEMON INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            Our lemon infused shea butter product is solely natural shea butter
            infused with lemon essential oil.
          </p>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% lemon
            essential oil. The outcome of the product is solid. Below are some
            uses and benefits of our lemon infused shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
              <dd className="mt-2 text-sm text-gray-500">
                <div className="mt-4">
                  <ul>
                    <li className="text-xs md:text-base">
                      • Reduces anxiety and depression.
                    </li>
                    <li className="text-xs md:text-base">
                      • Eases morning sickness.
                    </li>
                    <li className="text-xs md:text-base">
                      • Improves skin health.
                    </li>
                    <li className="text-xs md:text-base">• Relieves pain.</li>
                    <li className="text-xs md:text-base">
                      • Improves cold symptoms.
                    </li>
                    <li className="text-xs md:text-base">
                      • Used in the treatment of acne.
                    </li>
                    <li className="text-xs md:text-base">• Heals wounds.</li>
                    <li className="text-xs md:text-base">• Heals wounds.</li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src="/images/IMG_9330.jpg"
            className="rounded-lg bg-gray-100"
          />
          {/* <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            className="rounded-lg bg-gray-100"
          /> */}
        </div>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LEMON INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            Our lemon infused shea butter product is solely natural shea butter
            infused with lemon essential oil.
          </p>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% lemon
            essential oil. The outcome of the product is solid. Below are some
            uses and benefits of our lemon infused shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
              <dd className="mt-2 text-sm text-gray-500">
                <div className="mt-4">
                  <ul>
                    <li className="text-xs md:text-base">
                      • Reduces anxiety and depression.
                    </li>
                    <li className="text-xs md:text-base">
                      • Eases morning sickness.
                    </li>
                    <li className="text-xs md:text-base">
                      • Improves skin health.
                    </li>
                    <li className="text-xs md:text-base">• Relieves pain.</li>
                    <li className="text-xs md:text-base">
                      • Improves cold symptoms.
                    </li>
                    <li className="text-xs md:text-base">
                      • Used in the treatment of acne.
                    </li>
                    <li className="text-xs md:text-base">• Heals wounds.</li>
                    <li className="text-xs md:text-base">• Heals wounds.</li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src="/images/IMG_9330.jpg"
            className="rounded-lg bg-gray-100"
          />
          {/* <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            className="rounded-lg bg-gray-100"
          /> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className=" rounded-xl overflow-hidden group h-full "
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              COCONUT INFUSED SHEA BUTTER
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 90% shea butter and 10%
                  Coconut essential oil. The outcome of the product is solid.
                  Below are some uses and benefits of our Coconut infused shea
                  butter.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • Reduces anxiety and depression.
                  </li>
                  <li className="text-xs md:text-base">
                    • Eases morning sickness.
                  </li>
                  <li className="text-xs md:text-base">
                    • Improves skin health.
                  </li>
                  <li className="text-xs md:text-base">• Relieves pain.</li>
                  <li className="text-xs md:text-base">
                    • Improves cold symptoms.
                  </li>
                  <li className="text-xs md:text-base">
                    • Used in the treatment of acne.
                  </li>
                  <li className="text-xs md:text-base">• Heals wounds.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative rounded-xl overflow-hidden group col-span-1  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className="relative rounded-xl overflow-hidden group mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
        <div
          className=" rounded-xl overflow-hidden group h-full"
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              CITRONELLA INFUSED SHEA BUTTER
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 90% shea butter and 10%
                  Citronella essential oil. The outcome of the product is solid.
                  Below are some uses and benefits of our Citronella infused
                  shea butter.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • Prevents the growth or spread of harmful airborne
                    bacteria.
                  </li>
                  <li className="text-xs md:text-base">
                    • Serves as a repellent for flying insects such as
                    mosquitoes, etc.
                  </li>
                  <li className="text-xs md:text-base">
                    • Uplifts negative moods and relaxes the body and mind.
                  </li>
                  <li className="text-xs md:text-base">
                    • It is reputed to reduce muscles spasms, ease headaches,
                    and boost energy.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className=" rounded-xl overflow-hidden group h-full "
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              PERFUME INFUSED SHEA BUTTER
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 90% shea butter and 10%
                  Perfume oil. The outcome of the product is solid. Below are
                  some uses and benefits of our perfume infused shea butter.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • It gives a pleasant and desirable scent to one’s body.
                  </li>
                  <li className="text-xs md:text-base">
                    • Increases self-appeal and self-confidence.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Enhances health and well-being by improving one’s mood,
                    reducing anxiety and stress.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Increasing cognitive function and improving sleep.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative rounded-xl overflow-hidden group  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className="relative rounded-xl overflow-hidden group  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
        <div
          className=" rounded-xl overflow-hidden group h-full "
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              LAVENDER INFUSED SHEA BUTTER
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 90% shea butter and 10%
                  Perfume oil. The outcome of the product is solid. Below are
                  some uses and benefits of our Lavender infused shea butter.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • Reduces anxiety and emotions
                  </li>
                  <li className="text-xs md:text-base">• Improves Sleep. </li>
                  <li className="text-xs md:text-base">
                    • Helps heal burns and wounds.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Restores completion.
                  </li>
                  <li className="text-xs md:text-base">• Reduces acne. </li>
                  <li className="text-xs md:text-base">• Prevents wrinkles.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className=" rounded-xl overflow-hidden group h-full "
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              NATURAL SHEA BUTTER
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 100% shea butter. The
                  outcome of the product is solid. Below are some uses and
                  benefits of our Natural shea butter.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">• Reduces acne.</li>
                  <li className="text-xs md:text-base">
                    • Used in treating burns and cuts.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Cures dandruff in hair.
                  </li>
                  <li className="text-xs md:text-base">
                    • Prevents dry skin.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Also used for cooking.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative rounded-xl overflow-hidden group  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className="relative rounded-xl overflow-hidden group col-span-1  mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
        <div
          className=" rounded-xl overflow-hidden group h-full col-span-2"
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              VIRGIN COCONUT OIL
            </h2>

            <div className="flex flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 100% coconut oil. The
                  outcome of the product is liquid. Below are some uses and
                  benefits of our Coconut oil.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • Healthy for cooking.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Promotes hair growth and prevents hair damage.
                  </li>
                  <li className="text-xs md:text-base">
                    • Relieves skin irritation.
                  </li>
                  <li className="text-xs md:text-base">
                    • Moisturizes skin and promotes healthy skin as it prevents
                    infections.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Serves as a natural deodorant.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Heals damaged cuticles.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    {" "}
                    • Soothes chapped lips.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 p-2 h-[1500px] md:h-[700px] md:mt-44">
        <div
          className=" rounded-xl overflow-hidden group h-full"
          // style={{
          //   backgroundImage: "url('/images/IMG_9458.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col w-full h-full">
            <h2 className="md:text-3xl font-bold transition-transform duration-300 w-full px-2 md:px-8">
              LUXIE SHOWER GEL (AFRICAN BLACK SOAP)
            </h2>

            <div className="flex  flex-col w-full p-2 md:p-8 pt-12">
              <div className="flex flex-col">
                <p className="text-xs md:text-base">
                  The composition of the product is 30% African black soap, 60%
                  water, 5% vitamin E oil and 5 % lemon grass oil. The outcome
                  of the product is liquid. Below are some uses and benefits of
                  our shower gel.
                </p>
              </div>

              <div className="mt-4">
                <ul>
                  <li className="text-xs md:text-base">
                    • Promotes healthy skin.
                  </li>
                  <li className="text-xs md:text-base">
                    • Prevents skin itching.
                  </li>
                  <li className="text-xs md:text-base">
                    • Prevents fungal infections.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Minimizes appearance of scars.
                  </li>
                  <li className="text-xs md:text-base">
                    • Has antibacterial properties.{" "}
                  </li>
                  <li className="text-xs md:text-base">
                    • Reduces appearance of dark spots.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative rounded-xl overflow-hidden group mb-2 md:mb-0"
          style={{
            backgroundImage: "url('/images/IMG_9330.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
