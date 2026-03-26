"use client";

import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";

const STORAGE_TODOS = "todo-tasks";

type SubtaskItem = {
    id: string;
    text: string;
    completed: boolean;
};

type TodoItem = {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    subtasks: SubtaskItem[];
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return defaultValue;
        return JSON.parse(raw) as T;
    } catch {
        return defaultValue;
    }
}

function saveToStorage(key: string, value: unknown) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore
    }
}

function generateId() {
    return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function Todo() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>({});

    useEffect(() => {
        const loaded = loadFromStorage<TodoItem[] | { id: string; text: string; completed: boolean }[]>(STORAGE_TODOS, []);
        const migrated = loaded.map((t) =>
            "subtasks" in t
                ? (t as TodoItem)
                : { ...t, description: "", subtasks: [] } as TodoItem
        );
        setTodos(migrated);
    }, []);

    const saveTodos = useCallback((newTodos: TodoItem[]) => {
        setTodos(newTodos);
        saveToStorage(STORAGE_TODOS, newTodos);
    }, []);

    const addTodo = useCallback(() => {
        const text = inputValue.trim();
        if (!text) {
            toast.error("Digite uma tarefa", {
                position: "top-right",
                style: {
                    background: "#1d1e22",
                    color: "#fff",
                    border: "1px solid #333",
                    borderRadius: "8px",
                },
            });
            return;
        }
        const newTodo: TodoItem = {
            id: generateId(),
            text,
            description: descriptionValue.trim(),
            completed: false,
            subtasks: [],
        };
        saveTodos([...todos, newTodo]);
        setInputValue("");
        setDescriptionValue("");
    }, [inputValue, descriptionValue, todos, saveTodos]);

    const toggleTodo = useCallback(
        (id: string) => {
            saveTodos(
                todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
            );
        },
        [todos, saveTodos]
    );

    const removeTodo = useCallback(
        (id: string) => {
            saveTodos(todos.filter((t) => t.id !== id));
        },
        [todos, saveTodos]
    );

    const addSubtask = useCallback(
        (todoId: string) => {
            const text = (subtaskInputs[todoId] ?? "").trim();
            if (!text) return;
            saveTodos(
                todos.map((t) =>
                    t.id === todoId
                        ? {
                            ...t,
                            subtasks: [
                                ...t.subtasks,
                                { id: generateId(), text, completed: false },
                            ],
                        }
                        : t
                )
            );
            setSubtaskInputs((prev) => ({ ...prev, [todoId]: "" }));
        },
        [todos, saveTodos, subtaskInputs]
    );

    const toggleSubtask = useCallback(
        (todoId: string, subtaskId: string) => {
            saveTodos(
                todos.map((t) =>
                    t.id === todoId
                        ? {
                            ...t,
                            subtasks: t.subtasks.map((s) =>
                                s.id === subtaskId ? { ...s, completed: !s.completed } : s
                            ),
                        }
                        : t
                )
            );
        },
        [todos, saveTodos]
    );

    const removeSubtask = useCallback(
        (todoId: string, subtaskId: string) => {
            saveTodos(
                todos.map((t) =>
                    t.id === todoId
                        ? {
                            ...t,
                            subtasks: t.subtasks.filter((s) => s.id !== subtaskId),
                        }
                        : t
                )
            );
        },
        [todos, saveTodos]
    );

    const completedCount = todos.filter((t) => t.completed).length;

    return (
        <section className="bg-[#0d0d0d] py-16 px-8 md:px-32 flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-6xl font-bold text-primary">To-do</h1>
                <p className="text-xl font-bold text-secondary max-w-md">
                    Adicione tarefas e marque como concluídas
                </p>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && addTodo()}
                    placeholder="Nova tarefa..."
                    className="px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                <textarea
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    placeholder="Descrição (opcional)..."
                    rows={2}
                    className="px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                />
                <button
                    onClick={addTodo}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors w-fit"
                >
                    <Icon icon="mdi:plus" className="text-xl" />
                    Adicionar
                </button>
            </div>

            {todos.length > 0 && (
                <div className="space-y-4 max-w-2xl w-full">
                    <p className="text-gray-400 text-sm">
                        {completedCount} de {todos.length} concluídas
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/30 transition-colors overflow-hidden"
                            >
                                <div className="flex items-center gap-3 p-4 group">
                                    
                                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                                        <span
                                            className={`${todo.completed ? "text-gray-500 line-through" : "text-white"}`}
                                        >
                                            {todo.text}
                                        </span>
                                        {todo.description && (
                                            <span className="text-gray-500 text-xs truncate">
                                                {todo.description}
                                            </span>
                                        )}
                                    </div>
                                   
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTodo(todo.id);
                                        }}
                                        aria-label={todo.completed ? "Desmarcar" : "Concluir"}
                                        className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                                    >
                                        <Icon icon="material-symbols:check-rounded" className="text-xl font-bold cursor-pointer text-gray-400 hover:text-primary transition-colors" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTodo(todo.id);
                                        }}
                                        aria-label="Remover tarefa"
                                        className="flex-shrink-0 p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all"
                                    >
                                        <Icon icon="mdi:remove" className="text-xl" />
                                    </button>
                                </div>

                                <div className="px-4 pb-4 pt-0 border-t border-gray-700/50 mt-0">
                                    {todo.description && (
                                        <p className="text-gray-400 text-sm mb-4 py-2">
                                            {todo.description}
                                        </p>
                                    )}
                                    <div className="space-y-2">
                                        {todo.subtasks.length > 0 && (
                                            <p className="text-gray-500 text-xs font-medium uppercase">
                                                Subtarefas
                                            </p>
                                        )}
                                        {todo.subtasks.map((sub) => (
                                                <div
                                                    key={sub.id}
                                                    className="flex items-center gap-2 pl-6"
                                                >
                                                    <span
                                                        className={`flex-1 text-sm ${sub.completed ? "text-gray-500 line-through" : "text-white"
                                                            }`}
                                                    >
                                                        {sub.text}
                                                    </span>
                                                    <button
                                                        onClick={() => toggleSubtask(todo.id, sub.id)}
                                                        aria-label={sub.completed ? "Desmarcar subtarefa" : "Concluir subtarefa"}
                                                        className="p-1 text-gray-500 hover:text-primary transition-colors"
                                                    >
                                                        <Icon icon="mdi:check" className="text-base cursor-pointer" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeSubtask(todo.id, sub.id)}
                                                        aria-label="Remover subtarefa"
                                                        className="p-1 text-gray-500 "
                                                    >
                                                        <Icon icon="mdi:remove" className="text-base hover:text-red-500 transition-colors cursor-pointer" />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 pl-6">
                                                <input
                                                    type="text"
                                                    value={subtaskInputs[todo.id] ?? ""}
                                                    onChange={(e) =>
                                                        setSubtaskInputs((prev) => ({
                                                            ...prev,
                                                            [todo.id]: e.target.value,
                                                        }))
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") addSubtask(todo.id);
                                                    }}
                                                    placeholder="Nova subtarefa..."
                                                    className="flex-1 px-3 py-2 text-sm bg-[#131315] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                                />
                                                <button
                                                    onClick={() => addSubtask(todo.id)}
                                                    className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                                                >
                                                    <Icon icon="mdi:plus" className="text-lg" />
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {todos.length === 0 && (
                <p className="text-gray-500 text-sm">Nenhuma tarefa ainda. Adicione uma acima!</p>
            )}
        </section>
    );
}
