import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ListView, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialDialog from './MaterialDialog';

import colors from './colors';

export default class RadioGroup extends Component {

    constructor(props) {
        super(props);

        const { items, selectedItems } = props;
        const rows = buildSelectedRows(items, selectedItems);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.state = {
            dataSource,
            rows,
            text: '',
        };
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .3,
                    width: "100%",
                    backgroundColor: "#535252",
                }}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        const { items, selectedItems } = nextProps;
        const rows = buildSelectedRows(items, selectedItems);
        const dataSource = this.state.dataSource.cloneWithRows(rows);
        this.setState({ dataSource, rows });
    }

    onRowPress(name) {
        const rows = [...this.state.rows];
        const selectedIndex = rows.findIndex(e => e.selected == true);
        const selectIndex = rows.findIndex(e => e.label.name == name);
        if (selectedIndex > -1) {
            rows[selectedIndex].selected = false;
        }
        rows[selectIndex].selected = true;
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.setState({ dataSource, rows });
    }

    onCancel = () => {
        const rows = [...this.state.rows];
        const selectedIndex = rows.findIndex(e => e.selected == true);

        if (selectedIndex > -1) {
            rows[selectedIndex].selected = false;
        }
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.setState({ dataSource, rows });
    }

    SearchFilterFunction = (text) => {
        const newData = this.state.rows.filter(function (item) {
            const itemData = item.label.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    renderRow = (row, sectionID, rowID) => (
        <TouchableOpacity
            onPress={() => this.onRowPress(row.label.name)}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={row.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
                        color={row.selected ? "#E72222" : this.props.colorAccent}
                        size={24}
                    />
                </View>
                <Text style={styles.titletext}>{row.label.name}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <MaterialDialog
                title={this.props.title}
                titleColor={this.props.titleColor}
                colorAccent={this.props.colorAccent}
                visible={this.props.visible}
                okLabel={this.props.okLabel}
                paddingd={"flex-start"}
                scrolled={this.props.scrolled}
                onOk={() =>
                    this.props.onOk({
                        selectedItems: this.state.rows.filter(row => row.selected),
                    })}
                cancelLabel={this.props.cancelLabel}
                onCancel={() => this.onCancel(
                )}>
                <View style={styles.rowContainer1}>
                    <Icon
                        name={'search'}
                        color={this.props.colorAccent}
                        size={24}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Search Brand"
                        value={this.state.text}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.SearchFilterFunction(text)}
                    />
                </View>
                <ListView
                    renderSeparator={this.ListViewItemSeparator}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </MaterialDialog>
        );
    }
}

function buildSelectedRows(items, selectedItems) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: selectedItems.some(i => i.value === item.value),
        }),
    );

    return rows;
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3
    },
    rowContainer1: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
    },
    input: {
        width: "100%"
    },
    iconContainer: {
        marginRight: 10,
    },
    titletext: {
        color: "#535252",
        fontSize: 14,
        fontFamily: "Montserrat-Regular"
    },

});

RadioGroup.propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    colorAccent: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    scrolled: PropTypes.bool,
};

RadioGroup.defaultProps = {
    selectedItems: [],
    title: undefined,
    titleColor: undefined,
    colorAccent: colors.androidColorAccent,
    cancelLabel: undefined,
    okLabel: undefined,
    scrolled: true,
};
