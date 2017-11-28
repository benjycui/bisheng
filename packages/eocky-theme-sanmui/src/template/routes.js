/**
 * @file routes
 * @author weijiaxun <weijiaxun@baidu.com>
 */

/* eslint-disable fecs-export-on-declare */

import Home from './Home.san';

import AppBar from './AppBar.md';
import Avatar from './Avatar.md';
import Button from './Button.md';
import Badge from './Badge.md';
import Card from './Card.md';
import Carousel from './Carousel.md';
import Checkbox from './Checkbox.md';
import Chip from './Chip.md';
import ColorPicker from './ColorPicker.md';
import DatePicker from './DatePicker.md';
import Dialog from './Dialog.md';
import Divider from './Divider.md';
import Drawer from './Drawer.md';
import ExpansionPanel from './ExpansionPanel.md';
import Grid from './Grid.md';
import Icon from './Icon.md';
import InputNumber from './InputNumber.md';
import List from './List.md';
import Menu from './Menu/Menu.md';
import IconMenu from './Menu/IconMenu.md';
import DropdownMenu from './Menu/DropdownMenu.md';
import Radio from './Radio.md';
import Paper from './Paper.md';
import Pagination from './Pagination.md';
import Progress from './Progress.md';
import Ripple from './Ripple.md';
import Slider from './Slider.md';
import Switch from './Switch.md';
import SubHeader from './SubHeader.md';
import Table from './Table.md';
import Tabs from './Tabs.md';
import TreeView from './TreeView.md';
import TextField from './TextField.md';
import TimePicker from './TimePicker.md';
import Toast from './Toast.md';
import Uploader from './Uploader.md';
import Tooltip from './Tooltip.md';

import Installation from './guide/installation.md';
import Usage from './guide/usage.md';
import Develop from './guide/develop.md';

import Design from './resource/design.md';

let routes = [
    {
        path: '/',
        name: '首页',
        component: Home
    },
    {
        name: '指南',
        path: '/guide',
        components: [
            {
                name: '安装',
                path: '/installation',
                component: Installation
            },
            {
                name: '使用',
                path: '/usage',
                component: Usage
            },
            {
                name: '开发',
                path: '/develop',
                component: Develop
            }
        ]
    },
    {
        name: '组件',
        path: '/components',
        components: [
            {
                name: 'AppBar',
                component: AppBar
            },
            {
                name: 'Avatar',
                component: Avatar
            },
            {
                name: 'Badge',
                component: Badge
            },
            {
                name: 'Button',
                component: Button
            },
            {
                name: 'Card',
                component: Card
            },
            {
                name: 'Carousel',
                component: Carousel
            },
            {
                name: 'Chip',
                component: Chip
            },
            {
                name: 'Checkbox',
                component: Checkbox
            },
            {
                name: 'ColorPicker',
                component: ColorPicker
            },
            {
                name: 'DatePicker',
                component: DatePicker
            },
            {
                name: 'Dialog',
                component: Dialog
            },
            {
                name: 'Divider',
                component: Divider
            },
            {
                name: 'Drawer',
                component: Drawer
            },
            {
                name: 'ExpansionPanel',
                component: ExpansionPanel
            },
            {
                name: 'Grid',
                component: Grid
            },
            {
                name: 'Icon',
                component: Icon
            },
            {
                name: 'InputNumber',
                component: InputNumber
            },
            {
                name: 'List',
                component: List
            },
            {
                name: 'Menu',
                components: [
                    {
                        name: 'Menu',
                        component: Menu
                    },
                    {
                        name: 'IconMenu',
                        component: IconMenu
                    },
                    {
                        name: 'DropdownMenu',
                        component: DropdownMenu
                    }
                ]
            },
            {
                name: 'Pagination',
                component: Pagination
            },
            {
                name: 'Paper',
                component: Paper
            },
            {
                name: 'Progress',
                component: Progress
            },
            {
                name: 'Radio',
                component: Radio
            },
            {
                name: 'Ripple',
                component: Ripple
            },
            {
                name: 'Slider',
                component: Slider
            },
            {
                name: 'SubHeader',
                component: SubHeader
            },
            {
                name: 'Switch',
                component: Switch
            },
            {
                name: 'Table',
                component: Table
            },
            {
                name: 'Tabs',
                component: Tabs
            },
            {
                name: 'TextField',
                component: TextField
            },
            {
                name: 'TimePicker',
                component: TimePicker
            },
            {
                name: 'Toast',
                component: Toast
            },
            {
                name: 'Tooltip',
                component: Tooltip
            },
            {
                name: 'TreeView',
                component: TreeView
            },
            {
                name: 'Uploader',
                component: Uploader
            }
        ]
    },
    {
        name: '资源',
        path: '/resource',
        components: [
            {
                name: '图标',
                path: '/icon',
                component: Icon
            },
            {
                name: '设计规范',
                path: '/design',
                component: Design
            }
        ]
    }
];


export default routes;
