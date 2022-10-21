import React from 'react';

import { Button } from 'geekson-ui';

import css from '@styles/forms.module.css';

const RouteForm = ({ save, cancel, route, items }) => {
    const [beerFields, setBeerFields] = React.useState([]);

    React.useEffect(() => {
        if (route) {
            document.getElementById('name').value = route.name;
        }
    });

    const addFormLine = () => {
        const fieldId = `beer_${beerFields.length}`;

        const fieldJsx = (
            <>
                <label key={`label_${fieldId}`} htmlFor={fieldId}>Bière</label>
                <select key={fieldId} id={fieldId} name={fieldId}>
                    {items.map((item) => (
                        <option key={`${fieldId}_${item._id}`} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </>
        );

        setBeerFields([...beerFields, fieldJsx]);
    };

    const saveItem = () => {
        let routeBeers = [];

        for (let i = 0; i < beerFields.length; i++) {
            routeBeers.push({
                order: i + 1,
                name: document.getElementById(`beer_${i}`).value,
            });
        }

        save({
            name: document.getElementById('name').value,
            beers: routeBeers,
        });
    };

    return (
        <div className='form'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' />

            {beerFields.length > 0 ? (
                <div id='beersList' className={css.routeBeerList}>
                    {beerFields}
                </div>
            ) : null}

            <Button label='+' accent='green' className='mt-4 ml-0 py-2' clickHandler={addFormLine} />

            <div className='formActions'>
                <Button label='Save' accent='green' clickHandler={saveItem} />
                <Button label='Cancel' accent='red' clickHandler={cancel} />
            </div>
        </div>
    );
};

export default RouteForm;
