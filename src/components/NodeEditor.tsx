import React, { useState } from "react";
import { X, Plus, Save } from "lucide-react";

interface Field {
  name: string;
  type: string;
  isPrimary?: boolean;
  isRequired?: boolean;
}

interface NodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    label: string;
    fields: Field[];
  };
}

const FIELD_TYPES = [
  "id",
  "string",
  "text",
  "email",
  "timestamp",
  "number",
  "boolean",
];

export function NodeEditor({
  isOpen,
  onClose,
  onSave,
  initialData,
}: NodeEditorProps) {
  const [label, setLabel] = useState(initialData?.label || "");
  const [fields, setFields] = useState<Field[]>(initialData?.fields || []);

  const addField = () => {
    setFields([...fields, { name: "", type: "string", isRequired: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: Partial<Field>) => {
    setFields(fields.map((f, i) => (i === index ? { ...f, ...field } : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ label, fields, nodeType: "table" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Table Editor</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Name
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Fields
              </label>
              <button
                type="button"
                onClick={addField}
                className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Field
              </button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      updateField(index, { name: e.target.value })
                    }
                    placeholder="Field name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    required
                  />
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(index, { type: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  >
                    {FIELD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={field.isPrimary}
                        onChange={(e) =>
                          updateField(index, { isPrimary: e.target.checked })
                        }
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      PK
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={field.isRequired}
                        onChange={(e) =>
                          updateField(index, { isRequired: e.target.checked })
                        }
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      Required
                    </label>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
