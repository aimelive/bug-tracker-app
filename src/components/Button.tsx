const Button = (props: any) => {
  const classN = `${props.color} px-6 py-2 hover:${props.hover} rounded shadow font-medium
    text-xs
    leading-tight transition
    duration-150
    ease-in-out m-2`;

  return (
    <button onClick={props.click} className={classN}>
      {props.text}
    </button>
  );
};

export default Button;
