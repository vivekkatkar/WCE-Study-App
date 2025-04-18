
const IconBtn = (
    {text,
    onClick,
    children,
    disabled,
    outline ,
    customClasses,
    type}

)=>{
    return(
       <button
       className={` flex items-center justify-center gap-4  ${outline  ? " text-yellow-50 font-semibold "  :"  bg-yellow-50 text-black"} rounded-md px-4 py-2  ${outline  ? "outline-dashed  outline-yellow-50 " :""}`}
        disabled = {disabled}
        onClick={onClick}
        type={type}
       >
        {
            children ? (
            <>
            <span>
                {text}
            </span>
            {children}
            </>
            
            ) : (text)  
        }
       </button>
    )
}

export default IconBtn;