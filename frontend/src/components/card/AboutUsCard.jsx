import Card from "components/card";

const AboutUsCard = ({ BannerTitle, BannerDescription, image }) => {
  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white `}>
      <div className="h-full w-full">
        <div className="relative w-full ">
          <img
            src={image}
            className=" mb-3 h-full max-h-32 w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {BannerTitle}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {BannerDescription}{" "}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AboutUsCard;
