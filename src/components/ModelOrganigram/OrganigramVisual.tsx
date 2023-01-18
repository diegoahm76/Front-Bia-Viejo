import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useAppSelector } from '../../store/hooks/hooks';


export default function OrganigramVisual() {

    // Redux State Extraction
    const { levelsOrganigram, unityOrganigram } = useAppSelector((state) => state.organigram);

    const stylesTree = { padding: '5px', border: '1px solid black', borderRadius: '8px', display: 'inline-block' };
    const stylesTreeNode = { padding: '5px', border: '2px', borderRadius: '8px', display: 'inline-block' };

    return (
        <>
            <Tree
                lineWidth={'2px'}
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={<div style={{ ...stylesTree, background: 'yellow' }}>{levelsOrganigram[0].nombre} </div>}
            >

                <TreeNode label={<div style={{ ...stylesTreeNode, background: '#A8B7DC ' }}>{unityOrganigram[0].nombre}</div>}>
                    {levelsOrganigram.map((level, idx) =>
                        idx === 0 ? null :
                            <TreeNode label={<div style={{ ...stylesTree, background: '#4579FA' }}>{level.nombre}</div>}>
                                {unityOrganigram.map((unity) =>
                                    unity.id_nivel_organigrama === level.id_nivel_organigrama ?
                                        <TreeNode label={<div style={{ ...stylesTreeNode, background: '#A8B7DC ' }}>{unity.nombre}</div>} />
                                        : null
                                )}
                            </TreeNode>
                    )}
                </TreeNode>
            </Tree>
            {/*  */}
        </>
    )
}
