# Project overview
A lightweight React + TypeScript timeline that packs items into horizontal lanes as compactly as possible (like a Gantt view, but minimal). Items are positioned by date range; lanes are assigned greedily so non-overlapping items share the same lane. Horizontal scrolling is handled with simplebar-react.

# Run Instructions (Vite + React)

## Requirements
- Node.js 18 or newer  
- npm 9 or newer (or yarn/pnpm)  

## Running the project
``` 
npm install
npm run dev
``` 


# Challenge Questions:
What you like about your implementation.
- It's userfriendly solution

What you would change if you were going to do it again.
- Virtualize for handling large amount of items
- Split the components in more pieces, I spent too much time trying to solve overlaping issues
- Add useMemo

How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
- I searched for "Gantt view" and got some inspirations from there

How you would test this if you had more time.
- If I had more time, I would implement a combination of unit, integration, and visual regression tests to ensure both functionality and UI consistency.

The the assignLanes function i would test that:
- Items that do not overlap are placed in the same lane.
- Overlapping items are placed in different lanes.
- Edge cases like single-day events, equal start and end dates, or items starting exactly when another ends.

For date calculations:
- Correct percentage position (left) and width based on the timeline’s start and end

Render the Timeline with a fixed dataset and assert that:
- The correct number of lanes and items are rendered.
- Navigation buttons correctly adjust the scroll position.
- Test empty states (no items) and very dense datasets
 