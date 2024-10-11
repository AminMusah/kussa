export default function Explore() {
  return (
    <div className="explore">
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
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4  sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
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
                      • Improves cold symptoms.
                    </li>
                    <li className="text-xs md:text-base">
                      • Used in the treatment of acne.
                    </li>
                    <li className="text-xs md:text-base">• Heals wounds.</li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Our lemon infused shea butter product is solely natural shea butter
            infused with lemon essential oil."
            src="/images/IMG-20240818-WA0054.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
      <div className="mx-auto grid mb-24 max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="COCONUT INFUSED SHEA BUTTER"
            src="/images/IMG_9365.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            COCONUT INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% Coconut
            essential oil. The outcome of the product is solid. Below are some
            uses and benefits of our Coconut infused shea butter.
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
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mx-auto grid mb-24 max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            CITRONELLA INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% Citronella
            essential oil. The outcome of the product is solid. Below are some
            uses and benefits of our Citronella infused shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
              <dd className="mt-2 text-sm text-gray-500">
                <div className="mt-4">
                  <ul>
                    <li className="text-xs md:text-base">
                      • Serves as a repellent for flying insects such as
                      mosquitoes, etc.
                    </li>

                    <li className="text-xs md:text-base">
                      • It is reputed to reduce muscles spasms, ease headaches,
                      and boost energy.
                    </li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="CITRONELLA INFUSED SHEA BUTTER"
            src="/images/IMG-20240818-WA0045.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="PERFUME INFUSED SHEA BUTTER"
            src="/images/IMG_9390.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>{" "}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            PERFUME INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% Perfume
            oil. The outcome of the product is solid. Below are some uses and
            benefits of our perfume infused shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
              <dd className="mt-2 text-sm text-gray-500">
                <div className="mt-4">
                  <ul>
                    <li className="text-xs md:text-base">
                      • It gives a pleasant and desirable scent to one’s body.
                    </li>
                    <li className="text-xs md:text-base">
                      • Increases self-appeal and self-confidence.{" "}
                    </li>
                  </ul>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LAVENDER INFUSED SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 90% shea butter and 10% Perfume
            oil. The outcome of the product is solid. Below are some uses and
            benefits of our Lavender infused shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
              <div className="mt-4">
                <ul>
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
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="LAVENDER INFUSED SHEA BUTTER"
            src="/images/IMG-20240818-WA0082.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>{" "}
      </div>
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="NATURAL SHEA BUTTER"
            src="/images/IMG_9334.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>{" "}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            NATURAL SHEA BUTTER
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 100% shea butter. The outcome of
            the product is solid. Below are some uses and benefits of our
            Natural shea butter.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}
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
          </dl>
        </div>
      </div>
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            VIRGIN COCONUT OIL
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 100% coconut oil. The outcome of
            the product is liquid. Below are some uses and benefits of our
            Coconut oil.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}

              <div className="mt-4">
                <ul>
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
          </dl>
        </div>
        <div className="grid grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="VIRGIN COCONUT OIL"
            src="/images/IMG_9361.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>{" "}
      </div>
      <div className="mx-auto mb-24 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2  gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="AFRICAN BLACK SOAP"
            src="/images/IMG_9349.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>{" "}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LUXIE SHOWER GEL (AFRICAN BLACK SOAP)
          </h2>
          <p className="mt-4 text-gray-500">
            The composition of the product is 30% African black soap, 60% water,
            5% vitamin E oil and 5 % lemon grass oil. The outcome of the product
            is liquid. Below are some uses and benefits of our shower gel.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              {/* <dt className="font-medium text-gray-900">{feature.name}</dt> */}

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
          </dl>
        </div>
      </div>
    </div>
  );
}
