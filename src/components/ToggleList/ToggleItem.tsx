import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from './ToggleList.module.css'
import classNames from "classnames";
import { Category } from "./ToggleList";

export interface ToggleItemProps {
    id: Category;
    name: string;
    detail: string;
    className?: string
    activated?: boolean
    onChange?: (activated: boolean) => void;
}


export default function ToggleItem({ name, detail, className, activated: _activated, onChange }: ToggleItemProps) {
    const [activated, setActivated] = useState(_activated ?? false)

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current){
            firstUpdate.current = false
            return
        }
        console.log('toggleitem')
        onChange?.(activated)
    }, [activated])
    
    return <div title={detail} className={classNames(className, styles.item, activated ? styles.item__activated : '')} onClick={() => setActivated(!activated)}>
        <div className={classNames(className, styles.item, styles.item__activated)} style={{width: 0, height: 0, padding: 0}}/>
    </div>
}