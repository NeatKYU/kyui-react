// import React from 'react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Button } from '@/lib/components/Button'

describe('버튼 컴포넌트 테스트', () => {
    test('버튼 렌더링 되었는가?', () => {
        render(<Button>button</Button>)
        const buttonElement = screen.getByRole('button', { name: /button/i })
        expect(buttonElement).toBeInTheDocument()
    })

    test('disabled 속성이 적용되었는가?', () => {
        render(<Button disabled>disabled</Button>)
        const buttonElement = screen.getByRole('button', { name: /disabled/i })
        expect(buttonElement).toHaveClass('cursor-not-allowed')
    })

    test('loading 속성이 적용되었는가?', () => {
        render(<Button loading>loading</Button>)
        const buttonElement = screen.getByRole('button', { name: /loading/i })
        expect(buttonElement).toHaveClass('cursor-wait')
    })

    test('디폴트 사이즈가 md인가?', () => {
        render(<Button>default</Button>)
        const buttonElement = screen.getByRole('button', { name: /default/i })
        expect(buttonElement).toHaveClass('h-10')
    })
})
