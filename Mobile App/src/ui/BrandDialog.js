import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ListView, TextInput } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialDialog from './MaterialDialog';

import colors from './colors';

export default class BrandDialog extends Component {

    constructor(props) {
        super(props);

        const { items, selectedItems } = props;
        const rows = buildSelectedRows(items, selectedItems);
        const searchData = buildSelectedRows(items, selectedItems);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.state = {
            searchData,
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
        const searchData = buildSelectedRows(items, selectedItems);
        const dataSource = this.state.dataSource.cloneWithRows(rows);
        this.setState({ dataSource, rows });
        this.setState({ searchData });
    }

    onRowPress(ro) {

        const searchData = [...this.state.searchData];
        const rows = [...this.state.rows];

        if (ro.selected) {
            const selectIndex = searchData.findIndex(e => e.label.name == ro.label.name);
            searchData[selectIndex].selected = false;

            const selectIndex1 = rows.findIndex(e => e.label.name == ro.label.name);
            rows[selectIndex1].selected = false;

        } else {
            const selectIndex = searchData.findIndex(e => e.label.name == ro.label.name);
            searchData[selectIndex].selected = true;

            const selectIndex1 = rows.findIndex(e => e.label.name == ro.label.name);
            rows[selectIndex1].selected = true;
        }

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(searchData);
        this.setState({ dataSource, rows });
        this.setState({ searchData: searchData });

        //  console.log(JSON.stringify(rows));



    }

    onClear = () => {
        const rows = [...this.state.rows];
        const searchData = [...this.state.searchData];
        rows.map(e => {
            e.selected = false
        });
        searchData.map(e => {
            e.selected = false
        });
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.setState({ searchData, dataSource, rows, text: "" });

        // console.log(JSON.stringify('DELETE'+rows));
    }


    SearchFilterFunction = (text) => {
        const newData = this.state.rows.filter(function (item) {
            const itemData = item.label.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });
        this.setState({ searchData: newData });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    renderRow = (row, sectionID, rowID) => (
        <TouchableOpacity
            onPress={() => this.onRowPress(row)}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={row.selected ? 'check-box' : 'check-box-outline-blank'}
                        color={row.selected ? "#F3476F" : this.props.colorAccent}
                        size={24}
                    />
                </View>
                <Text style={styles.titletext}>{row.label.name.length > 28 ? (row.label.name.substring(0, 28 - 3)) + '...' : row.label.name}</Text>
            </View>
        </TouchableOpacity>
    );

    handleChange = (text) => {
        this.setState({ text: text });
        this.props.onChange(text);
    }

    done = () => {
        this.setState({ text: "" });
        this.props.onOk({
            selectedItems: this.state.rows.filter(row => row.selected),
        });
    }

    render() {
        return (
            <MaterialDialog
                title={this.props.title}
                titleColor={this.props.titleColor}
                colorAccent={this.props.colorAccent}
                visible={this.props.visible}
                okLabel={this.props.okLabel}
                paddingd={"center"}
                scrolled={this.props.scrolled}
                onOk={() => this.done()}
                onCancel={() => this.props.onCancel({
                    onCancel: this.setState({
                        text: ''
                    })
                })}
                cancelLabel={this.props.cancelLabel}
                onClear={() => this.onClear()}>
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
                        onChangeText={(text) => this.handleChange(text)}
                    />
                </View>
                <ListView
                    // renderSeparator={this.ListViewItemSeparator}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </MaterialDialog>
        );
    }
}

function buildSelectedRows(items, selectedItems) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: selectedItems.some(i => i.label.name === item.label.name),
        }),
    );
    //  console.log(JSON.stringify(items));
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

BrandDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    colorAccent: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    scrolled: PropTypes.bool,
};

BrandDialog.defaultProps = {
    selectedItems: [],
    title: undefined,
    titleColor: undefined,
    colorAccent: colors.androidColorAccent,
    cancelLabel: undefined,
    okLabel: undefined,
    scrolled: true,
};
