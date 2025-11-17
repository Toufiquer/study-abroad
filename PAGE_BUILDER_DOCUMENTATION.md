# Next.js Page Builder System Documentation

## Overview

A comprehensive Next.js Page Builder System that allows users to create, manage, and display dynamic page layouts through a drag-and-drop admin interface.

## Features

- **Admin Panel**: Visual page builder with drag-and-drop functionality
- **Section Library**: Pre-built sections (6 sections available)
- **Drag & Drop Reordering**: Intuitive reordering with dnd-kit
- **Persistent Storage**: MongoDB-backed data persistence
- **Real-time Preview**: Preview pages in a new tab
- **Server-Side Rendering**: Client pages use React Server Components
- **Responsive UI**: Built with Tailwind CSS and shadcn/ui

## Architecture

### File Structure

```
src/app/
├── page-builder/
│   ├── admin/
│   │   └── page.tsx          # Admin interface
│   ├── page.tsx              # Client-facing page (RSC)
│   └── sectionData.tsx       # Section definitions
│
└── api/
    └── page-builder/
        ├── route.ts          # API endpoints (GET, POST, PUT)
        ├── controller.ts     # Business logic
        └── model.ts          # MongoDB schema
```

## Components

### 1. Section Data Structure (`/page-builder/sectionData.tsx`)

Defines all available sections with:
- Admin component (for editing)
- Client component (for display)
- Metadata (title, picture, status)

**Interface:**
```typescript
interface SectionData {
  id: number;
  title: string;
  adminPath: React.ReactNode;
  clientPath: React.ReactNode;
  isActive: boolean;
  picture: string;
}
```

### 2. Admin Page (`/page-builder/admin/page.tsx`)

**Features:**
- Add Section button → Opens modal with section library
- Section selection (multiple instances allowed)
- Drag-and-drop reordering using dnd-kit
- Delete sections
- Edit section content inline
- Save to database
- Preview functionality

**Key Functions:**
- `fetchPageData()`: Loads existing page configuration
- `handleAddSection()`: Adds selected section to page
- `handleDeleteSection()`: Removes section from page
- `handleDragEnd()`: Reorders sections via drag-and-drop
- `handleSave()`: Persists page to database
- `handlePreview()`: Opens client page in new tab

### 3. Client Page (`/page-builder/page.tsx`)

**React Server Component** that:
- Fetches saved page data server-side
- Renders sections in saved order
- Passes optional data props to sections
- Shows empty state if no sections exist

### 4. API Layer (`/api/page-builder/`)

#### Model (`model.ts`)
MongoDB schema for storing page configuration:
```typescript
{
  sections: [
    {
      id: number,        // Section type ID
      data?: any         // Optional section-specific data
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

#### Controller (`controller.ts`)
- `getPage()`: Retrieves latest page configuration
- `savePage(sections)`: Creates/updates page configuration

#### Routes (`route.ts`)
- `GET /api/page-builder`: Fetch current page
- `POST /api/page-builder`: Create new page
- `PUT /api/page-builder`: Update existing page

## Usage

### Admin Panel

1. Navigate to `/page-builder/admin`
2. Click "Add Section" to open section library
3. Select sections (can add same section multiple times)
4. Drag sections to reorder
5. Edit section content inline
6. Click "Save Page" to persist changes
7. Click "Preview" to view client page

### Client Page

Navigate to `/page-builder` to view the published page with all saved sections.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Database**: MongoDB with Mongoose
- **State Management**: React useState
- **Notifications**: Sonner (toast)

## API Endpoints

### GET `/api/page-builder`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "sections": [
      {
        "id": 1,
        "data": {}
      }
    ],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### POST/PUT `/api/page-builder`

**Request:**
```json
{
  "sections": [
    {
      "id": 1,
      "data": {}
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* saved page */ },
  "message": "Page saved successfully"
}
```

## Section Integration

To add new sections:

1. Create Admin and Client components in `/workshop/section/all-section/section-X/`
2. Import in `sectionData.tsx`
3. Add to `initialSectionData` array:

```typescript
{
  id: 7,
  title: 'New Section',
  adminPath: <AdminSection7 />,
  clientPath: <ClientSection7 />,
  isActive: true,
  picture: 'https://...',
}
```

## Database Schema

Collection: `pageBuilder`

```javascript
{
  _id: ObjectId,
  sections: [
    {
      id: Number,      // References section from initialSectionData
      data: Mixed      // Section-specific configuration
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Dependencies

- `@dnd-kit/core`: ^6.3.1
- `@dnd-kit/sortable`: ^10.0.0
- `@dnd-kit/utilities`: ^3.2.2
- `mongoose`: ^8.15.0
- `next`: ^15.5.3
- `react`: 19.1.0
- `sonner`: ^2.0.7

## Environment Variables

Required in `.env.local`:

```
mongooseURI=mongodb://...
```

## Key Features Explained

### Drag-and-Drop

Uses `@dnd-kit` for accessible, touch-friendly drag-and-drop:
- Pointer sensor with 8px activation distance
- Keyboard sensor for accessibility
- Visual feedback during drag
- Automatic reordering with `arrayMove`

### Section Reusability

Same section can be added multiple times with unique IDs:
```typescript
uniqueId: `${sectionId}-${Date.now()}-${Math.random()}`
```

### Server-Side Rendering

Client page uses RSC pattern:
- Data fetched server-side
- No client-side loading state
- Better SEO and performance

## Future Enhancements

Potential improvements:
- Section data editing modal
- Undo/redo functionality
- Section templates
- Multi-page support
- Version history
- Section visibility toggles
- Responsive preview modes

## Troubleshooting

**Issue**: Sections not appearing
- Verify MongoDB connection
- Check section IDs match `initialSectionData`

**Issue**: Drag-and-drop not working
- Ensure unique IDs for sections
- Check dnd-kit sensors configuration

**Issue**: Save failing
- Verify API route is accessible
- Check MongoDB connection string
- Review browser console for errors

## License

Part of the App-Generator project.
