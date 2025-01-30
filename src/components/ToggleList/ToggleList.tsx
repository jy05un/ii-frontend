import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from './ToggleList.module.css'
import ToggleItem, { ToggleItemProps } from "./ToggleItem";
import classNames from "classnames";


export enum Category {
    NAVER = 'naver',
    SOOP = 'soop',
    X = 'x',
    INSTAGRAM = 'ig',
}

export interface ToggleListProps {
    className?: string
    onCategoryChanged?: (category: Category[]) => void
}

export default function ToggleList({ className, onCategoryChanged }: ToggleListProps) {
    const items: ToggleItemProps[] = [
        {
            id: Category.NAVER,
            name: '네이버 카페',
            detail: '네이버 카페',
            className: styles.naver
        },
        {
            id: Category.SOOP,
            name: 'Soop',
            detail: 'Soop',
            className: styles.soop
        },
        {
            id: Category.X,
            name: 'X',
            detail: 'X',
            className: styles.x
        },
        {
            id: Category.INSTAGRAM,
            name: 'instagram',
            detail: 'instagram',
            className: styles.instagram
        },
    ]
    const [category, setCategory] = useState<Set<Category>>(new Set())

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current){
            firstUpdate.current = false
            return
        }
        onCategoryChanged?.([...category])
    }, [category])


    const toggle = (id: Category, activated: boolean) => {
        console.log('togglelist')
        if (activated) {
            const newCategory = category
            newCategory.add(id)
            setCategory(prev => new Set(prev.add(id)))
        } else {
            const newCategory = category
            newCategory.delete(id)
            setCategory(prev => new Set([...prev].filter(c => c !== id)))
        }
    }

    return <div className={classNames(className, styles.list)}>
        {items.map((item) =>
            <ToggleItem
                className={item.className}
                key={item.id} 
                id={item.id} 
                name={item.name} 
                detail={item.detail}
                activated={item.id in category}
                onChange={(activated) => toggle(item.id, activated)} />
        )}
    </div>
}