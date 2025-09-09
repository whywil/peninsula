
# Document Explorer App
This React single page application is a Document Storage Explorer that allows users to navigate and view a hierarchy of files and folders with the following key functionality:

### Data Structure:
It works with a data model where each item is either a FileItem (with properties like type, name, added date) or a FolderItem (with a name, type set to "folder", and an array of files it contains).

### Expandable Folders:
Users can click on folder names to expand or collapse them. This state is managed with a React useState hook holding a Set of expanded folder names. Clicking toggles a folder’s presence in this set, controlling whether its contents are shown.

### Rendering Logic:
Files and folders are rendered differently:
Files display an icon, name, file extension, and formatted date added.
Folders show a clickable header with a folder icon, toggle chevron, folder name, and count of items inside. If expanded, the folder’s files are rendered below with indentation.

### Icons and Styling:
File types have distinct icons and colors using the Lucide icon library. Tailwind CSS is used for consistent, responsive styling and layout.

### Date Formatting:
File added dates are formatted for user-friendly display using the Irish locale and short day/month/year style.

### Legend:
A legend visually explains the icon colors for different file types and specifies that folders are clickable for expand/collapse functionality.

## Summary:
Overall, the app provides an intuitive, interactive UI to explore documents in nested folders, leveraging React’s component model, hooks, and TypeScript for type safety.
This is a fully functional, extensible file explorer UI. It may be ideal as a core component for users in Peninsula Group has a section for reviewing documents in storage.

**Further Improvements**
1) Sorting by name for folders and by date for files can be implemented for cleaner reporting.
2) Filter by filename
3) Fetch data from an API or external data source. Maybe a path to the file that could be then opened (even with a local source).
   
### Use of the App:
1) Pull from the GitHub repo.
2) Open folder in VS Code
3) Run npm install to have everything as per package.json
4) Project set up using Vite - Run `npm run dev` in the terminal.
5) Open on localhost: http://localhost:5173/
6) Click the button:
   >View Uploaded Documents
   
### Testing
Using Jest: 
`npm test -- --watch`
which runs the following test:
`DocumentExplorer.perf.test.tsx`

This runs 2 performance tests, checking component rendering and the folders opening/closing performance.

    1) renders within acceptable time (within 100ms)
    2) handles multiple folder expansions efficiently (within 80ms)
    
    