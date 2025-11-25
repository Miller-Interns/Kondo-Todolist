import type { TodoItem } from './TodoItem.ts'


export interface TodoCategory {
id: string
title: string
items: TodoItem[]
}