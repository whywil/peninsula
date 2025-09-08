import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, FileText, Video } from 'lucide-react';


// Type definitions
interface FileItem {
  type: 'pdf' | 'doc' | 'csv' | 'mov';
  name: string;
  added: string;
}

interface FolderItem {
  type: 'folder';
  name: string;
  files: FileItem[];
}

type Item = FileItem | FolderItem;

// Sample data
const fileData: Item[] = [
  {
    "type": "pdf",
    "name": "Employee Handbook",
    "added": "2017-01-06"
  },
  {
    "type": "pdf",
    "name": "Public Holiday policy",
    "added": "2016-12-06"
  },
  {
    "type": "folder",
    "name": "Expenses",
    "files": [
      {
        "type": "doc",
        "name": "Expenses claim form",
        "added": "2017-05-02"
      },
      {
        "type": "doc",
        "name": "Fuel allowances",
        "added": "2017-05-03"
      }
    ]
  },
  {
    "type": "csv",
    "name": "Cost centres",
    "added": "2016-08-12"
  },
  {
    "type": "folder",
    "name": "Misc",
    "files": [
      {
        "type": "doc",
        "name": "Christmas party",
        "added": "2017-12-02"
      },
      {
        "type": "mov",
        "name": "Welcome to the company!",
        "added": "2015-04-24"
      }
    ]
  }
];

const DocumentExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Toggle folder expansion
  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  // Get appropriate icon for file type
  const getFileIcon = (type: string) => {
    const iconProps = { size: 16, className: "mr-2" };
    
    switch (type) {
      case 'pdf':
        return <File {...iconProps} className="mr-2 text-red-600" />;
      case 'doc':
        return <FileText {...iconProps} className="mr-2 text-blue-600" />;
      case 'csv':
        return <File {...iconProps} className="mr-2 text-green-600" />;
      case 'mov':
        return <Video {...iconProps} className="mr-2 text-purple-600" />;
      default:
        return <File {...iconProps} className="mr-2 text-gray-600" />;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render a file item
  const renderFile = (file: FileItem, level: number = 0) => (
    <div
      key={`${file.name}-${file.added}`}
      className={`flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-50 ${
        level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4' : ''
      }`}
    >
      <div className="flex items-center flex-1">
        {getFileIcon(file.type)}
        <span className="font-medium text-gray-800">{file.name}</span>
        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded uppercase">
          {file.type}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Added: {formatDate(file.added)}
      </div>
    </div>
  );

  // Render a folder item
  const renderFolder = (folder: FolderItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.name);
    
    return (
      <div key={folder.name}>
        <div
          className={`flex items-center justify-between p-2 border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
            level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4' : ''
          }`}
          onClick={() => toggleFolder(folder.name)}
        >
          <div className="flex items-center flex-1">
            {isExpanded ? (
              <ChevronDown size={16} className="mr-2 text-gray-600" />
            ) : (
              <ChevronRight size={16} className="mr-2 text-gray-600" />
            )}
            <Folder size={16} className="mr-2 text-yellow-600" />
            <span className="font-medium text-gray-800">{folder.name}</span>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
              FOLDER (Clickable)
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {folder.files.length} item{folder.files.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50">
            {folder.files.map(file => renderFile(file, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">File Explorer</h1>
      
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
          <div className="flex justify-between text-sm font-semibold text-gray-700">
            <span>Name & Type</span>
            <span>Date Added</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {fileData.map((item) => {
            if (item.type === 'folder') {
              return renderFolder(item as FolderItem);
            } else {
              return renderFile(item as FileItem);
            }
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Legend:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center">
              <File size={16} className="mr-2 text-red-600" />
              <span>PDF files</span>
            </div>
            <div className="flex items-center">
              <FileText size={16} className="mr-2 text-blue-600" />
              <span>DOC files</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <File size={16} className="mr-2 text-green-600" />
              <span>CSV files</span>
            </div>
            <div className="flex items-center">
              <Video size={16} className="mr-2 text-purple-600" />
              <span>MOV files</span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <Folder size={16} className="mr-2 text-yellow-600" />
          <span>Folders (click to expand/collapse)</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentExplorer;