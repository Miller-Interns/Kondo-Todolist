import { useTodoStore } from '../stores/todo-store'


function uid() {
	return Math.random().toString(36).substring(2)
}


export function useTodo() {
	const store = useTodoStore()


	function addCategory(title: string) {
		if (!title.trim()) return
		store.categories.push({ id: uid(), title, items: [] })
	}


	function deleteCategory(id: string) {
		const idx = store.categories.findIndex(c => c.id === id)
		if (idx > -1) {
			store.categories.splice(idx, 1)
		}
	}


	function addItem(categoryId: string, text: string) {
		const cat = store.categories.find(c => c.id === categoryId)
		if (!cat || !text.trim()) return
		cat.items.push({ id: uid(), text, done: false })
	}


	function toggleItem(cId: string, iId: string) {
		const cat = store.categories.find(c => c.id === cId)
		const it = cat?.items.find(i => i.id === iId)
		if (it) it.done = !it.done
	}


	function deleteItem(cId: string, iId: string) {
		const cat = store.categories.find(c => c.id === cId)
		if (cat) cat.items = cat.items.filter(i => i.id !== iId)
	}


	function updateItem(cId: string, iId: string, newText: string) {
		const cat = store.categories.find(c => c.id === cId)
		const it = cat?.items.find(i => i.id === iId)
		if (it && newText.trim()) {
			it.text = newText.trim()
		}
	}


	return {
		categories: store.categories,
		addCategory,
		deleteCategory,
		addItem,
		toggleItem,
		deleteItem
		,
		updateItem
	}
}