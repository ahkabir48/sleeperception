# Sleep Perception

Patient dashboard for nurses in LTCs to keep track of their patients' sleep patterns and get notified of any inconsistencies in order to administer the proper care, when they need it.

## Future Improvements

### Infrastructure & Deployment
- Deploy frontend using Vercel and backend using Render.com for production-grade hosting
- Migrate frontend to Next.js for improved performance, SEO, and server-side rendering
- Implement persistent login using JWT authentication via secure HTTP-only cookies

### Data Management & Integration
- Integrate with existing LTC patient management systems to automate patient logging
- Add support for manual patient data updates (name, room, sleep patterns)
- Implement robust data retention policies and analytics for long-term sleep pattern analysis
- Scale the system to support multiple wards and facilities

### Advanced Features
- Integrate with camera systems to gather real-time sleep data
- Add video frame review capability for restless periods (with privacy considerations)
- Implement a dedicated video data storage solution for frame analysis

### Technical Improvements
- Migrate backend to FastAPI (Python) for improved performance and type safety
- Implement comprehensive backend testing suite
- Add end-to-end testing for critical user flows
