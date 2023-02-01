import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { ISon } from '../../Interfaces/Organigrama';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';


export default function OrganigramVisual() {

    // Redux State Extraction
    const { moldOrganigram } = useAppSelector((state) => state.organigram);

    // Dispatch instance
    const dispatch = useAppDispatch();

    const stylesTree = { padding: '5px', border: '1px solid black', borderRadius: '8px', display: 'inline-block' };
    const stylesTreeNode = { padding: '5px', border: '1px solid black', borderRadius: '8px', display: 'inline-block' };

    function StyleColor(type: string) {
        switch (type) {
            case 'LI':
                return '#4BCF76';
            case 'AS':
                return '#EB4949';
            case 'AP':
                return '#2E64FE';
            default:
                return '#6bb22b';
        }
    }
    function CreateMoldOrganigram(data: ISon[]) {
        return data.map((item: any) => {
            return (
                <TreeNode label={<div style={{ ...stylesTree, background: StyleColor(item.cod_tipo_unidad), color: '#fff' }}>{item.nombre} </div>}>
                    {item.hijos.length > 0 ? CreateMoldOrganigram(item.hijos) : null}
                </TreeNode>
            )
        })
    }
    console.log(moldOrganigram, 'moldOrganigram')
    return (
        <>
            <Tree
                lineWidth={'2px'}
                lineColor={'black'}
                lineBorderRadius={'10px'}
                label={<div style={{ ...stylesTreeNode, background: '#6bb22b', color: '#fff' }}>{moldOrganigram[0].nombre} </div>}
            >
                {CreateMoldOrganigram(moldOrganigram[0].hijos)}
            </Tree>
        </>
    )
}
