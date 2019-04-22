
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ListView, TextInput } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialDialog from './MaterialDialog';

import colors from './colors';

export default class SortDialog extends Component {

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

    onRowPress(rowID, value) {
         const rows = [...this.state.rows];
        // rows[rowID] = Object.assign({}, rows[rowID], {
        //     selected: !rows[rowID].selected,
        // });
        // //alert(JSON.stringify(rows));
        // const dataSource = this.state.dataSource.cloneWithRows(rows);
        // this.setState({ dataSource, rows });
        if (value == "A to Z" || value == "BestSeller") {
            if(value == "A to Z"){
                rows[rowID] = Object.assign({}, rows[rowID],{
                    selected: !rows[rowID].selected,
                });
                rows[2] = Object.assign({},rows[2],{
                    selected: false,
                });
                const dataSource = this.state.dataSource.cloneWithRows(rows);
                this.setState({ dataSource, rows });
            }
            else{
                rows[0] = Object.assign({}, rows[0], {
                    selected: !rows[rowID].selected,
                });
                const dataSource = this.state.dataSource.cloneWithRows(rows);
                this.setState({ dataSource, rows });
            }   
        }
        else {
            if(value == "Z to A"){
                rows[rowID] = Object.assign({}, rows[rowID], {
                    selected: !rows[rowID].selected,
                });
                rows[1] = Object.assign({}, rows[1], {
                    selected: false,
                });
                const dataSource = this.state.dataSource.cloneWithRows(rows);
                this.setState({ dataSource, rows });
            }
            else{
                rows[0] = Object.assign({}, rows[0], {
                    selected: !rows[rowID].selected,
                });
                const dataSource = this.state.dataSource.cloneWithRows(rows);
                this.setState({ dataSource, rows });
            } 
        }
    }

    onClear = () => {
        const rows = [...this.state.rows];
        rows.map(e => {
            e.selected = false
        })
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 || r1.selected !== r2.selected,
        }).cloneWithRows(rows);
        this.setState({ dataSource, rows });
    }

    // SearchFilterFunction = (text) => {
    //     const newData = this.state.rows.filter(function (item) {
    //         const itemData = item.label.value.toUpperCase()
    //         const textData = text.toUpperCase()
    //         return itemData.indexOf(textData) > -1
    //     })
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(newData),
    //         text: text
    //     })
    // }
    renderRow = (row, sectionID, rowID) => (
        <TouchableOpacity
            onPress={() => this.onRowPress(rowID, row.label.value)}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={row.selected ? 'check-box' : 'check-box-outline-blank'}
                        color={row.selected ? "#F3476F" : this.props.colorAccent}
                        size={24}
                    />
                </View>
                <Text style={styles.titletext}>{row.label.value}</Text>
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
                paddingd={"flex-end"}
                scrolled={this.props.scrolled}
                onCancel={this.props.onCancel}
                onOk={() =>
                    this.props.onOk({
                        selectedItems: this.state.rows.filter(row => row.selected),
                    })}
                cancelLabel={this.props.cancelLabel}
                onClear={() => this.onClear()}>
                {/* <View style={styles.rowContainer1}>
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
                </View> */}
                <ListView
                    //  renderSeparator={this.ListViewItemSeparator}
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
        padding: 6
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

SortDialog.propTypes = {
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

SortDialog.defaultProps = {
    selectedItems: [],
    title: undefined,
    titleColor: undefined,
    colorAccent: colors.androidColorAccent,
    cancelLabel: undefined,
    okLabel: undefined,
    scrolled: true,
};
