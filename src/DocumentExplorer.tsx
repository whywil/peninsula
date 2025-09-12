/* WILLIAM WHYTE FOR PENINSULA INTERVIEW TASK - Updated 12/Sept/2025 */
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, FileText, Video } from 'lucide-react';
import data from './data.json';

// File type definitions
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

const fileData: Item[] = data as Item[];




// Type guard functions
const isFolder = (item: Item): item is FolderItem => item.type === 'folder';
const isFile = (item: Item): item is FileItem => item.type !== 'folder';


const DocumentExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'other'>('asc');
  

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === "sortButton" ) {
      sortOrder === 'desc' ? setSortOrder('asc') : setSortOrder('desc');
    }
  }; 

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(folderName)) {
        newExpanded.delete(folderName);
      } else {
        newExpanded.add(folderName);
      }
      return newExpanded;
    });
  };

  const getFileIcon = (type: string) => {
    const baseProps = { size: 16, className: "mr-2" };
    
    switch (type) {
      case 'pdf':
        return <File {...baseProps} className="mr-2 text-red-600" />;
      case 'doc':
        return <FileText {...baseProps} className="mr-2 text-blue-600" />;
      case 'csv':
        return <File {...baseProps} className="mr-2 text-green-600" />;
      case 'mov':
        return <Video {...baseProps} className="mr-2 text-purple-600" />;
      default:
        return <File {...baseProps} className="mr-2 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderFile = (file: FileItem, level: number = 0) => (
    <div
      key={`${file.name}-${file.added}`}
      className={`flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-50 ${
        level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4' : ''
      }`}
      role="listitem"
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

  const renderFolder = (folder: FolderItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.name);

    return (
      <div key={folder.name}>
        <div
          className={`flex items-center justify-between p-2 border-b border-gray-200 hover:bg-blue-50 cursor-pointer ${
            level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4' : ''
          }`}
          onClick={() => toggleFolder(folder.name)}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} folder ${folder.name}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFolder(folder.name);
            }
          }}
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
              FOLDER
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {folder.files.length} item{folder.files.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50" role="group" aria-label={`Files in ${folder.name}`}>
            {folder.files.map(file => renderFile(file, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Sort folders alphabetically, then files alphabetically
  const sortedFileData = [...fileData].sort((a, b) => {
    if (isFolder(a) && !isFolder(b)) return -1;
    if (!isFolder(a) && isFolder(b)) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Document Storage Explorer</h1>
      
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        {/* The heading row */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
          <p id="sortButton" className="relative z-10 cursor-pointer" onClick={handleClick}>Sort</p>
          <div id="dataHeader" className="flex justify-between text-sm font-semibold text-gray-700">
            <span>Name & Type</span>
            <span>Date Added</span>
          </div>
        </div>

        {/* The data displayed */}
        <div className="divide-y divide-gray-200 relative z-10" role="list">
      

        {(sortOrder === 'asc'
          ? sortedFileData
          : [...fileData].sort((b, a) => {
              if (isFolder(b) && !isFolder(a)) return -1;
              if (!isFolder(b) && isFolder(a)) return 1;
              return a.name.localeCompare(b.name);
            })
        ).map((item) => {
          if (isFolder(item)) {
            return renderFolder(item, 0);
          } else {
            return renderFile(item, 0);
          }
        })}




          {/* Render sorted items instead of original fileData */}
          {/* {sortedFileData.map((item) => {
            if (isFolder(item)) {
              return renderFolder(item, 0);
            } else {
              return renderFile(item, 0);
            }
          })} */}
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
