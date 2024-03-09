import { useGlobalContext } from "./Context";

export default function About() {
  const { abilities, height, weight } = useGlobalContext().state.singlePook;
  return (
    <div className="flex flex-col gap-2 items-center mt-3 md:mt-1">
      <h2 className="font-semibold text-2xl">About</h2>
      <div className="flex flex-col items-center bg-[#EEEEEE] w-[80%] border-t-[2px] border-b-[2px] border-[#D9D9D9] shadows">
        <table>
          <tbody>
            <tr>
              <td className="head">Height</td>
              <td>{Number.parseFloat(height / 10).toFixed(1)}m</td>
            </tr>
            <tr>
              <td className="head">Weight</td>
              <td>{Number.parseFloat(weight / 10).toFixed(1)}kg</td>
            </tr>
            <tr>
              <td className="head">Abilities</td>
              <td>
                {abilities.map((ability, index) => (
                  <li key={index} className="w-full list-disc  ">
                    {ability}
                  </li>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
