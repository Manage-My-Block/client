import { render, screen } from '@testing-library/react'

import MeetingItem from '../src/components/Meetings/MeetingItem'

const meeting = {
    title: 'Sustainable Initiatives',
    description: 'A meeting to discuss Innovative ideas for greener living',
    meetingDate: new Date('2023-09-12'),
    zoomLink: 'https://www.google.com.au/'
}

describe('MeetingItem', () => {

    // render the component on each test case
    beforeEach(() => {
        render(<MeetingItem meeting={meeting} />)
    })

    test('should show meeting title', () => {
        expect(screen.getByText(meeting.title)).toBeDefined()
    })

    test('should show meeting description', () => {
        expect(screen.getByText(meeting.description)).toBeDefined()
    })

    // test('should show meeting date', () => {
    //     expect(screen.getByText(meeting.meetingDate)).toBeDefined()
    // })

    // test('should show meeting title', () => {
    //     expect(screen.getByText(meeting.zoomLink)).toBeDefined()
    // })
})
