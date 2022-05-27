# Database Model

## User: ✅
    User schema
- id: int
- first_name: string
- last_name: string
- password: string
- email: string
- phone: string
- salt: string
- role: string

## Listing:
    Home DB schema
- id: int
- title: string
- user_id: (User.id)
- category: (Category.id)
- images: hasMany(Image.id)
- keywords: hasMany(Keyword.id)
- requirements: hasMany(Requerment.id)
- description: string
- size: int [optional]
- price: int
- status: string
- sublet: boolean
- **Rooms** 
  - bedrooms: int
  - bathrooms: int
  - dining: int
  - kitchen: int
  - drawingroom: int
- **address**
  - full_address: string
  - district: string
  - house_no: int
  - floor_no: int [optional]
  - flat_no: int [optional]
  - lat: float [optional]
  - long: float [optional]

## Requirement: ✅
    Requirements schema
- id: int
- title: string
- isting_id: (Listing.id)

## Image: ✅
    Image schema
- id: int
- image: string
- isting_id: (Listing.id)

## Keyword: ✅
    Keyword schema
- id: int
- name: string
- listing_id: (Listing.id)

## Category: ✅
    Category schema
- id: int
- name: string

## Request ✅
    Request schema
- id: int
- user_id: (User.id)
- owner_id: (User.id)
- occupation: string
- job_title: string
- phone: string
- document: string // NID or University ID [optional]
- status: string