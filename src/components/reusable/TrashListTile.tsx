import { motion } from "framer-motion";
import { timeAgo } from "../../helpers/shared";
import Button from "./Button";
import { containerVariants } from "./ListTile";

const TrashListTile = (props: any) => {
  const { bug, onDelete, onRestore } = props;
  // console.log(bug);
  const time: string = bug.resolved
    ? "Resolved " + timeAgo(bug.resolvedAt)
    : "Created " + timeAgo(bug.createdAt);
  return (
    <motion.div
      variants={containerVariants}
      initial="init"
      animate="animate"
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={{ left: 0, bottom: 0, right: 0, top: 0 }}
      dragElastic={1}
      className="bg-main flex justify-between flex-col rounded shadow-sm shadow-slate-700 hover:shadow-md hover:shadow-slate-500"
    >
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
        {bug.title[0].toUpperCase() + bug.title.substring(1).toLowerCase()}
      </div>
      <span className="text-center text-xs italic font-semibold">{time}</span>
      <div className="flex justify-center">
        <Button
          click={onRestore}
          text="Restore"
          color="bg-slate-500"
          hover="bg-slate-400"
        />
        <Button
          click={onDelete}
          text="Delete"
          color="bg-red-500"
          hover="bg-pink-800"
        />
      </div>
    </motion.div>
  );
};

export default TrashListTile;
