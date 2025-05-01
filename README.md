# SleePerception

Patient dashboard for nurses in LTCs to keep track of their patients' sleep patterns and get notified of any inconsistencies in order to administer the proper care, before the onset of delirium or other care facility induced conditions.

## Current Capabilities
- Simple login and authentication
- Logging, reading, updating, and deletion of patient data
- Sleep score calculations (rough, not scientific yet)
- Notification system (only read/delete, no write yet)

## Future Improvements

### Overall
- Deploy frontend using Vercel and backend using Render.com for production-grade hosting
- Migrate frontend to Next.js for improved performance, SEO, and server-side rendering
- Migrate backend to FastAPI (Python) for improved performance and type safety
- Implement comprehensive backend tests (currently only typescript tests)
- Implement persistent login using JWT authentication via secure HTTP-only cookies

### Data
- Integrate with existing LTC patient management systems to automate patient logging
- Add support for manual patient data updates (name, room, sleep patterns)
- Implement robust data retention policies and analytics for long-term sleep pattern analysis
- Scale the system to support multiple wards and facilities

### Features
- Integrate with camera systems to gather real-time sleep data
- Add video frame review capability for restless periods (with privacy considerations)
- Implement a dedicated video data storage solution for frame analysis
