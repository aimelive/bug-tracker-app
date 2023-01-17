import { timeAgo } from "../helpers/timeAgo";
import Button from "./Button";

const ListTile = (props: any) => {
  const { bug, onDelete, onResolve } = props;
  const time: string = timeAgo(bug.date);
  return (
    <div className="flex justify-between flex-col rounded shadow-sm shadow-slate-700 hover:shadow-md hover:shadow-slate-500">
      <div className="flex justify-center">
        {bug.resolved === true ? (
          <div className="text-xs bg-green-700 px-2 py-1 rounded-full cursor-pointer shadow-inner shadow-slate-700 hover:shadow-md">
            Resolved
          </div>
        ) : (
          <div className="text-xs bg-yellow-500 px-2 py-1 rounded-full cursor-pointer shadow-inner shadow-slate-500 hover:shadow-md">
            Bug 🐞
          </div>
        )}
      </div>
      <div className="text-center text-overflow p-4 text-gray-300">
        {bug.description[0].toUpperCase() +
          bug.description.substring(1).toLowerCase()}
      </div>
      <span className="text-center text-xs italic font-semibold">{time}</span>
      <div className="flex justify-center">
        {bug.resolved === false && (
          <Button
            click={onResolve}
            text="Resolve"
            color="bg-slate-500"
            hover="bg-slate-400"
          />
        )}
        <Button
          click={onDelete}
          text="Delete"
          color="bg-blue-900"
          hover="bg-pink-800"
        />
      </div>
    </div>
  );
};

export default ListTile;
