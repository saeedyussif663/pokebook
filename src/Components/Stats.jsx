import { useGlobalContext } from "./Context";
import { setThemeColor } from "./Context";

export default function Stats() {
  const { state } = useGlobalContext();
  const stats = state.singlePook.stats;
  const { themeBg } = setThemeColor(state.theme);
  return (
    <div className="flex flex-col gap-2 items-center mt-3 md:mt-0">
      <h2 className="font-semibold text-2xl">Stats</h2>
      <div className="flex flex-col items-center bg-[#EEEEEE] w-[80%] border-t-[2px] border-b-[2px] border-[#D9D9D9] shadows">
        {stats.map((stat, index) => {
          let progressPercentage = Math.min((stat.stats_num / 150) * 100, 100);
          return (
            <div
              key={index}
              className="w-full flex justify-around gap-7 items-center"
            >
              <p className="text-right w-1/2 text-lg capitalize">
                {stat.stats_name}
              </p>
              <div className="w-1/2  flex items-center justify-between">
                <div className="bg-[#CBCBCB] h-2 w-[60px] md:w-[120px]">
                  <div
                    className={`h-full ${themeBg}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="pr-6 font-semibold">{stat.stats_num}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
