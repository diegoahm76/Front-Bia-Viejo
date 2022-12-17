import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useAppSelector } from '../../store/hooks/hooks';

export default function OrganigramVisual() {

    // Redux State Extraction
    const { organigramCurrent, levelsOrganigram, unityOrganigram } = useAppSelector((state) => state.organigram);

    return (
        <>

            <Tree
                lineWidth={'2px'}
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={<div>{organigramCurrent.nombre} </div>}
            >
                {levelsOrganigram.map((level) =>
                    <TreeNode label={<div>{level.nombre}</div>}>
                        {unityOrganigram.map((unity) =>
                            unity.id_nivel_organigrama === level.id_nivel_organigrama ?
                                <TreeNode label={<div>{unity.nombre}</div>} />
                                : null
                        )}
                    </TreeNode>
                )}
            </Tree>
        </>
    )
}