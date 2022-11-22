import React, {useEffect} from 'react';
import css from '@styles/stats.module.css'

const FunStats = ({amount, unity, label}) => {


    return <div className={css.funStatBlock}>
        <div>
            <span className={css.funStatAmount}>
            {amount}
            </span>
        <span className={css.funStatUnity}>
            {unity}
        </span>
        </div>
        <div className={css.funStatLabel}>
            {label}
        </div>
    </div>


}


export default FunStats;