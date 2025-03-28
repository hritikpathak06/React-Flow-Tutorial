
import { Handle, Position } from '@xyflow/react';
import { Database, KeyRound, Hash, Calendar, Type, Mail } from 'lucide-react';

interface FieldType {
  name: string;
  type: string;
  isPrimary?: boolean;
  isRequired?: boolean;
}

interface CustomNodeProps {
  data: {
    label: string;
    fields: FieldType[];
    nodeType: 'table' | 'view' | 'function';
  };
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'id':
      return <Hash className="w-3 h-3 text-purple-500" />;
    case 'date':
    case 'timestamp':
      return <Calendar className="w-3 h-3 text-blue-500" />;
    case 'string':
    case 'text':
      return <Type className="w-3 h-3 text-green-500" />;
    case 'email':
      return <Mail className="w-3 h-3 text-red-500" />;
    default:
      return <Type className="w-3 h-3 text-gray-500" />;
  }
};

export function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="shadow-xl rounded-xl bg-white border-2 border-gray-200 min-w-[250px]">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-xl flex items-center gap-2">
        <Database className="w-5 h-5 text-teal-600" />
        <div className="font-bold text-gray-800">{data.label}</div>
      </div>
      
      <div className="px-4 py-2">
        {data.fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center gap-2 py-1 border-b last:border-0 border-gray-100"
          >
            {field.isPrimary && (
              <KeyRound className="w-3 h-3 text-amber-500" />
            )}
            {getTypeIcon(field.type)}
            <span className="text-sm font-medium text-gray-700">
              {field.name}
            </span>
            <span className="text-xs text-gray-500 ml-auto">
              {field.type}
              {field.isRequired && <span className="text-red-500 ml-1">*</span>}
            </span>
          </div>
        ))}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-teal-500"
      />
    </div>
  );
}