const Input = ({ 
    name,
    type = 'text',
    value,
    onChange,
    placeHolder = '' ,
    required = false,
}) => {
    return(
        <input 
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeHolder}
            className="bg-altBgColor rounded-sm p-2.5 w-xs text-black shadow-2xl font-poppins"
        />
    )
}

export default Input