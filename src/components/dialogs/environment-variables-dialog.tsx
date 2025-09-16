"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export interface EnvironmentVariable {
    id: string
    name: string
    value: string
}

interface EnvironmentVariablesDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    serviceName: string
    initialVariables?: EnvironmentVariable[]
    onSave?: (variables: EnvironmentVariable[]) => void
}

export function EnvironmentVariablesDialog({
    open,
    onOpenChange,
    serviceName,
    initialVariables = [],
    onSave
}: EnvironmentVariablesDialogProps) {
    const [variables, setVariables] = useState<EnvironmentVariable[]>(
        initialVariables.length > 0
            ? initialVariables
            : [{ id: crypto.randomUUID(), name: "", value: "" }]
    )

    const addVariable = () => {
        setVariables(prev => [
            ...prev,
            { id: crypto.randomUUID(), name: "", value: "" }
        ])
    }

    const removeVariable = (id: string) => {
        if (variables.length > 1) {
            setVariables(prev => prev.filter(variable => variable.id !== id))
        }
    }

    const updateVariable = (id: string, field: 'name' | 'value', value: string) => {
        setVariables(prev => prev.map(variable =>
            variable.id === id
                ? { ...variable, [field]: value }
                : variable
        ))
    }

    const handleSave = () => {
        // Filter out empty variables
        const validVariables = variables.filter(variable =>
            variable.name.trim() !== "" && variable.value.trim() !== ""
        )

        onSave?.(validVariables)
        onOpenChange(false)
    }

    const handleCancel = () => {
        // Reset to initial state
        setVariables(
            initialVariables.length > 0
                ? initialVariables
                : [{ id: crypto.randomUUID(), name: "", value: "" }]
        )
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Configure Environment Variables</DialogTitle>
                    <DialogDescription>
                        Set up environment variables for {serviceName} integration. These variables will be used in MCP (Model Context Protocol).
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Environment Variables</Label>
                        <Button
                            onClick={addVariable}
                            size="sm"
                            variant="outline"
                            className="h-8"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Variable
                        </Button>
                    </div>

                    <ScrollArea className="h-[300px] w-full border rounded-md p-4">
                        <div className="space-y-3">
                            {variables.map((variable, index) => (
                                <div key={variable.id}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`name-${variable.id}`} className="text-xs text-muted-foreground">
                                                Variable Name
                                            </Label>
                                            <Input
                                                id={`name-${variable.id}`}
                                                placeholder="VARIABLE_NAME"
                                                value={variable.name}
                                                onChange={(e) => updateVariable(variable.id, 'name', e.target.value)}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor={`value-${variable.id}`} className="text-xs text-muted-foreground">
                                                    Variable Value
                                                </Label>
                                                {variables.length > 1 && (
                                                    <Button
                                                        onClick={() => removeVariable(variable.id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                            <Input
                                                id={`value-${variable.id}`}
                                                placeholder="variable_value"
                                                value={variable.value}
                                                onChange={(e) => updateVariable(variable.id, 'value', e.target.value)}
                                                className="font-mono text-sm"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    {index < variables.length - 1 && <Separator className="my-3" />}
                                </div>
                            ))}

                            {variables.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p className="text-sm">No environment variables configured.</p>
                                    <p className="text-xs mt-1">Click "Add Variable" to get started.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Variables
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
