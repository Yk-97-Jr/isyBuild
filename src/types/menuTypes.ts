// React Imports
import type {ReactNode} from 'react'

// MUI Imports
import type {ChipProps} from '@mui/material/Chip'

// Type Imports
import type {
  SubMenuProps as VerticalSubMenuProps,
  MenuItemProps as VerticalMenuItemProps,
  MenuSectionProps as VerticalMenuSectionProps
} from '@menu/vertical-menu'
import type {
  SubMenuProps as HorizontalSubMenuProps,
  MenuItemProps as HorizontalMenuItemProps
} from '@menu/horizontal-menu'
import type {MenuItemExactMatchUrlProps} from '@menu/types'

// Vertical Menu Data
// Vertical Menu Data
export type VerticalMenuItemDataType = Omit<
  VerticalMenuItemProps,
  'children' | 'exactMatch' | 'activeUrl' | 'icon' | 'prefix' | 'suffix' | 'roles' | 'href'
> &
  MenuItemExactMatchUrlProps & {
  label: ReactNode
  excludeLang?: boolean
  icon?: string
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
  roles?: string[] // roles should be a list of strings
  permissions?: string[]
  href?: string

}

export type VerticalSubMenuDataType = Omit<
  VerticalSubMenuProps,
  'children' | 'icon' | 'prefix' | 'suffix' | 'roles' | 'href'
> & {
  children: VerticalMenuDataType[]
  icon?: string
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
  roles?: string[] // roles should be a list of strings
  permissions?: string[] // roles should be a list of strings
  href?: string
}

export type VerticalSectionDataType = Omit<VerticalMenuSectionProps, 'children'> & {
  isSection: boolean
  children: VerticalMenuDataType[]
  roles?: string[] // roles should be a list of strings
  permissions?: string[] // roles should be a list of strings
  href?: string
}
export type VerticalMenuDataType = VerticalMenuItemDataType | VerticalSubMenuDataType | VerticalSectionDataType

// Horizontal Menu Data
export type HorizontalMenuItemDataType = Omit<
  HorizontalMenuItemProps,
  'children' | 'exactMatch' | 'activeUrl' | 'icon' | 'prefix' | 'suffix'
> &
  MenuItemExactMatchUrlProps & {
  label: ReactNode
  excludeLang?: boolean
  icon?: string
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
}
export type HorizontalSubMenuDataType = Omit<HorizontalSubMenuProps, 'children' | 'icon' | 'prefix' | 'suffix'> & {
  children: HorizontalMenuDataType[]
  icon?: string
  prefix?: ReactNode | ChipProps
  suffix?: ReactNode | ChipProps
}
export type HorizontalMenuDataType = HorizontalMenuItemDataType | HorizontalSubMenuDataType
