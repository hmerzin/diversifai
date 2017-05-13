import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

export default class FavoriteSites extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Favorite Sites</TableHeaderColumn>
                        <TableHeaderColumn>Diversity Score</TableHeaderColumn>
                        <TableHeaderColumn>Industry Diversity Score</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHeaderColumn><a href="http://www.gap.com">gap.com</a></TableHeaderColumn>
                        <TableHeaderColumn>84%</TableHeaderColumn>
                        <TableHeaderColumn>73.5%</TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn><a href="https://www.donaldjtrump.com/">donaldjtrump.com</a></TableHeaderColumn>
                        <TableHeaderColumn>37%</TableHeaderColumn>
                        <TableHeaderColumn>82%</TableHeaderColumn>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
}
