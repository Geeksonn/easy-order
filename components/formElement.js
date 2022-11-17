import React from 'react';

const buildInputJsx = (element) => {
    const { id, type } = element;
    let jsx;

    switch (type) {
        case 'text':
        case 'number': 
            jsx = <input key={`input_${id}`} className='w-4/5' type={type} id={id} name={id} />;
            break;
        case 'file':
            jsx = <input type='file' accept='image/*' className='w-4/5' id={id} name={id} />;
            break;
        case 'select':
            const { options } = element;
            jsx = (
                <select className='w-4/5' id={id} name={id}>
                    {options.map((opt) => (
                        <option key={`${id}_${opt._id}`} value={opt.name}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            jsx = <></>;
    }

    return jsx;
};

const GroupedFormElement = ({ elements }) => {
    const [radioCheck, setRadioCheck] = React.useState([]);

    React.useEffect(() => {
        let array = [];
        elements.forEach((el, idx) => {
            array.push({
                id: el.id,
                checked: idx === 0,
            });
        });
        setRadioCheck(array);
    }, []);

    const handleRadioChange = (event) => {
        const { value } = event.target;

        setRadioCheck(
            radioCheck.map((item) => {
                return {
                    id: item.id,
                    checked: item.id === value,
                };
            })
        );
    };

    if (radioCheck.length > 0) {
        return elements.map((el) => {
            const { id, label } = el;
            const checked = radioCheck.find((it) => it.id === id).checked;

            return (
                <div key={`div_${id}`} className='formElementWrapper'>
                    <input
                        key={`radio_${id}`}
                        className='w-fit mr-1'
                        type='radio'
                        id={`radio_${id}`}
                        value={id}
                        checked={checked}
                        onChange={handleRadioChange}
                    />
                    <label key={`label_${id}`} className='w-1/5' htmlFor={id}>
                        {label}
                    </label>
                    {checked ? buildInputJsx(el) : null}
                </div>
            );
        });
    } else {
        return <div>Loading ...</div>;
    }
};

const FormElement = ({ element }) => {
    const { id, label } = element;

    return (
        <div key={`div_${id}`} className='formElementWrapper'>
            <label key={`label_${id}`} className='w-1/5' htmlFor={id}>
                {label}
            </label>
            {buildInputJsx(element)}
        </div>
    );
};

export { FormElement, GroupedFormElement };
